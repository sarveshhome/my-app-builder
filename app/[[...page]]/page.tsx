// app/[[...page]]/page.tsx
import { Content, fetchOneEntry, isPreviewing } from "@builder.io/sdk-react-nextjs";
import { notFound } from "next/navigation";

const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY!;

interface PageProps {
  params: Promise<{ page?: string[] }>;
  searchParams: Promise<Record<string, string>>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { page } = await params;
  const search = await searchParams;
  const urlPath = "/" + (page?.join("/") || "");

  const content = await fetchOneEntry({
    model: "page",
    apiKey: BUILDER_API_KEY,
    userAttributes: { urlPath },
  });

  if (!content && !isPreviewing(search)) {
    notFound();
  }

  return (
    <Content content={content} apiKey={BUILDER_API_KEY} model="page" />
  );
}