import { LegalPage } from "@/components/marketing/legal-page";

export const metadata = { title: "Terms of Service — Brandoria" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 2025"
      sections={[
        {
          heading: "Agreement",
          body: [
            "By using this website or engaging Brandoria for services, you agree to these terms.",
          ],
        },
        {
          heading: "Services",
          body: [
            "Scope, timeline and cost are agreed in writing before any project begins. Anything outside that scope is treated as a change request.",
          ],
        },
        {
          heading: "Payment",
          body: [
            "Projects are billed against agreed milestones. Invoices are due within 14 days unless otherwise stated.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "Upon final payment, you own the deliverables produced for your project. We retain the right to showcase the work in our portfolio unless you ask us not to.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "We work with care but cannot guarantee specific business outcomes. Our liability is limited to the fees paid for the specific engagement.",
          ],
        },
      ]}
    />
  );
}