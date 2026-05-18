'use client'

import { useState, useTransition } from 'react'
import { assignSubdomain, saveCustomDomain, checkVerification, removeCustomDomain } from '@/lib/actions/domain'
import type { PortfolioData } from '@/lib/queries/portfolio'

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN ?? 'ifeanyiokafor.com'

export default function DomainSection({ portfolio }: { portfolio: PortfolioData }) {
  const [isPending, startTransition] = useTransition()
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null)
  const [showAddDomain, setShowAddDomain] = useState(false)

  const subdomain = portfolio.subdomain
  const mapping = portfolio.domainMapping

  function handleAssign() {
    startTransition(async () => { await assignSubdomain() })
  }

  function handleSaveDomain(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await saveCustomDomain(fd)
      setShowAddDomain(false)
    })
  }

  function handleCheckVerification() {
    startTransition(async () => {
      const result = await checkVerification()
      setVerifyMessage(result.verified ? 'Domain verified!' : (result.error ?? 'Not verified yet.'))
    })
  }

  function handleRemoveDomain() {
    startTransition(async () => {
      await removeCustomDomain()
      setVerifyMessage(null)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Subdomain card */}
      <div className="border border-gray-200 bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium text-sm text-gray-900">Free subdomain</p>
            <p className="text-xs text-gray-400 mt-0.5">Included with all plans</p>
          </div>
          {subdomain ? (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">Active</span>
          ) : (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 font-medium">Not assigned</span>
          )}
        </div>

        {subdomain ? (
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
            <span className="text-sm font-mono text-gray-700 flex-1 break-all">
              {subdomain}.{BASE_DOMAIN}
            </span>
            <a
              href={`https://${subdomain}.${BASE_DOMAIN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-900 shrink-0"
            >
              Visit ↗
            </a>
          </div>
        ) : (
          <button
            onClick={handleAssign}
            disabled={isPending}
            className="w-full py-2.5 rounded-lg border border-gray-900 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60"
          >
            {isPending ? 'Assigning…' : 'Host with free subdomain'}
          </button>
        )}
      </div>

      {/* Custom domain card */}
      <div className="border border-gray-200 bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium text-sm text-gray-900">Custom domain</p>
            <p className="text-xs text-gray-400 mt-0.5">Use your own domain name</p>
          </div>
          {mapping?.verified ? (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">Verified</span>
          ) : mapping ? (
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 font-medium">Pending</span>
          ) : null}
        </div>

        {mapping ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
              <span className="text-sm font-mono text-gray-700 flex-1 break-all">{mapping.customDomain}</span>
              {mapping.verified && (
                <a
                  href={`https://${mapping.customDomain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-gray-900 shrink-0"
                >
                  Visit ↗
                </a>
              )}
            </div>

            {!mapping.verified && (
              <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 flex flex-col gap-3">
                <p className="font-medium text-gray-900">Add these DNS records at your domain provider:</p>
                <div className="flex flex-col gap-2 font-mono">
                  <div className="flex gap-3 items-start">
                    <span className="text-gray-400 w-10 shrink-0">CNAME</span>
                    <span className="text-gray-500 w-6 shrink-0">@</span>
                    <span className="text-gray-700 break-all">cname.vercel-dns.com</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-gray-400 w-10 shrink-0">TXT</span>
                    <span className="text-gray-500 w-auto shrink-0 text-[10px] leading-4">_portfolio-verify</span>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-gray-700 break-all">{mapping.verificationToken}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(mapping.verificationToken)}
                        className="text-[10px] text-blue-500 hover:text-blue-700 text-left w-fit"
                      >
                        Copy token
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400">DNS changes can take up to 24 hours to propagate.</p>
              </div>
            )}

            <div className="flex gap-2">
              {!mapping.verified && (
                <button
                  onClick={handleCheckVerification}
                  disabled={isPending}
                  className="flex-1 py-2 rounded-lg border border-gray-900 bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors disabled:opacity-60"
                >
                  {isPending ? 'Checking…' : 'Check verification'}
                </button>
              )}
              <button
                onClick={handleRemoveDomain}
                disabled={isPending}
                className="px-4 py-2 rounded-lg border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors disabled:opacity-60"
              >
                Remove
              </button>
            </div>

            {verifyMessage && (
              <p className={`text-xs ${verifyMessage.includes('verified!') ? 'text-green-600' : 'text-red-500'}`}>
                {verifyMessage}
              </p>
            )}
          </div>
        ) : showAddDomain ? (
          <form onSubmit={handleSaveDomain} className="flex flex-col gap-3">
            <input
              name="domain"
              type="text"
              placeholder="yourdomain.com"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:border-gray-400"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 py-2 rounded-lg border border-gray-900 bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors disabled:opacity-60"
              >
                {isPending ? 'Saving…' : 'Save domain'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddDomain(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowAddDomain(true)}
            className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            + Add custom domain
          </button>
        )}
      </div>
    </div>
  )
}
