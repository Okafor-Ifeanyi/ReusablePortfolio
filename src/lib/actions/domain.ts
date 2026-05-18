"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import dns from "dns/promises";

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 30);
}

async function getPortfolioForCurrentUser() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      id: true,
      fullName: true,
      portfolio: {
        select: {
          id: true,
          subdomain: true,
          isHosted: true,
          domainMapping: true,
        },
      },
    },
  });

  if (!user?.portfolio) redirect("/dashboard");
  return { user, portfolio: user.portfolio };
}

export async function assignSubdomain() {
  const { user, portfolio } = await getPortfolioForCurrentUser();

  if (portfolio.isHosted && portfolio.subdomain) {
    return {
      subdomain: portfolio.subdomain,
      domain: `${portfolio.subdomain}.${BASE_DOMAIN}`,
    };
  }

  const firstName = (user.fullName ?? "user").split(" ")[0];
  const base = slugify(firstName) || "user";

  let candidate = base;
  let counter = 2;

  while (true) {
    const existing = await prisma.portfolio.findUnique({
      where: { subdomain: candidate },
    });
    if (!existing || existing.id === portfolio.id) break;
    candidate = `${base}${counter}`;
    counter++;
  }

  await prisma.portfolio.update({
    where: { id: portfolio.id },
    data: { subdomain: candidate, isHosted: true, isPublished: true },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/domain");

  return { subdomain: candidate, domain: `${candidate}.${BASE_DOMAIN}` };
}

export async function saveCustomDomain(formData: FormData) {
  const { portfolio } = await getPortfolioForCurrentUser();
  const domain = (formData.get("domain") as string)
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  if (!domain) return { error: "Domain is required" };

  const token = crypto.randomUUID();

  await prisma.domainMapping.upsert({
    where: { portfolioId: portfolio.id },
    create: {
      portfolioId: portfolio.id,
      customDomain: domain,
      verificationToken: token,
    },
    update: {
      customDomain: domain,
      verificationToken: token,
      verified: false,
      verifiedAt: null,
    },
  });

  revalidatePath("/dashboard/domain");
  return { token };
}

export async function checkVerification() {
  const { portfolio } = await getPortfolioForCurrentUser();

  const mapping = await prisma.domainMapping.findUnique({
    where: { portfolioId: portfolio.id },
  });
  if (!mapping) return { verified: false, error: "No domain configured" };
  if (mapping.verified) return { verified: true };

  try {
    const records = await dns.resolveTxt(
      `_portfolio-verify.${mapping.customDomain}`,
    );
    const found = records.flat().includes(mapping.verificationToken);

    if (found) {
      await prisma.domainMapping.update({
        where: { id: mapping.id },
        data: { verified: true, verifiedAt: new Date() },
      });
      revalidatePath("/dashboard/domain");
      return { verified: true };
    }

    return {
      verified: false,
      error: "TXT record not found yet. DNS changes can take up to 24 hours.",
    };
  } catch {
    return {
      verified: false,
      error:
        "Could not resolve DNS. Check that the record was added correctly.",
    };
  }
}

export async function removeCustomDomain() {
  const { portfolio } = await getPortfolioForCurrentUser();

  await prisma.domainMapping.deleteMany({
    where: { portfolioId: portfolio.id },
  });

  revalidatePath("/dashboard/domain");
}
