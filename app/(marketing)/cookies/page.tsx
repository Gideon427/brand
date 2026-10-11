import { LegalPage } from "@/components/marketing/legal-page";

export const metadata = { title: "Cookie Policy — Brandoria" };

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="October 2025"
      sections={[
        {
          heading: "What cookies we use",
          body: [
            "Essential cookies: needed for the site to work (for example, keeping you logged in to your client dashboard).",
            "Analytics cookies: help us understand which pages are useful and which aren't.",
          ],
        },
        {
          heading: "What we don't do",
          body: [
            "We don't use cookies to track you across other websites, and we don't sell cookie data to third parties.",
          ],
        },
        {
          heading: "Managing cookies",
          body: [
            "You can block or delete cookies through your browser settings. Doing so may affect how parts of the site work.",
          ],
        },
      ]}
    />
  );
}