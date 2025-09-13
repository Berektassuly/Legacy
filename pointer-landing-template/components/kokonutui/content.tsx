
import TrustEcosystemSection from "@/components/trust-ecosystem-section"
import { SocialProof } from "@/components/social-proof"

export default function Content() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Ensure trust and prevent fraud with verifiable, soulbound credentials for Universities.
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Build transparent reputation networks and protect against fake institutions through community-driven reporting. Empower HR teams with reliable CVs and enable secure document storage across healthcare, logistics, and beyond — all while keeping ownership of data in the hands of individuals, not corporations.
        </p>
      </section>
      <SocialProof />
      <TrustEcosystemSection />
    </div>
  )
}
