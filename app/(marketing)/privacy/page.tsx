import { LegalPage } from "@/components/marketing/legal-page";

export const metadata = { title: "Privacy Policy — Brandoria" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2025"
      sections={[
        {
          heading: "What we collect",
          body: [
            "We collect information you provide directly — your name, email address, business details and any messages you send through our forms.",
            "We also collect basic analytics data such as pages visited, referrer and approximate location.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To respond to enquiries, provide services you've requested, and improve the site.",
            "We do not sell your data. Ever.",
          ],
        },
        {
          heading: "Who we share with",
          body: [
            "We use a small number of trusted third-party tools for hosting, analytics and email. Each is bound by its own privacy terms.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can request a copy of your data, ask us to correct it, or ask us to delete it at any time by emailing hello@brandoria.co.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "We use a small number of cookies for essential site functionality and analytics. You can manage them through your browser settings.",
          ],
        },
      ]}
    />
  );
}