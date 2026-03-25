import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>
        Reusable Portfolio
        <Link href='/users'>
          Go to users
        </Link>
      </h1>
    </main>
  );
}