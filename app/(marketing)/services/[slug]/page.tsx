import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { CtaSection } from "@/components/marketing/cta-section";
import { ServiceDetail } from "@/components/marketing/service-detail";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} — Brandoria`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <ServiceDetail service={service} others={others} />
      <CtaSection />
    </>
  );
}