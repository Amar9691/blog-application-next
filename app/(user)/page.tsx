import { draftMode } from "next/headers";
import BlogPosts from "@/components/BlogPosts";
import { postsQuery } from "@/lib/queries";
import type { SanityDocument } from "@sanity/client";
import { sanityFetch, token } from "@/actions/sanityFetch";
import PreviewProvider from "@/components/PreviewProvider";
import PreviewPosts from "@/components/PreviewPosts";

export default async function Home({ data }: { data: SanityDocument[] }) {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewPosts posts={posts} />
      </PreviewProvider>
    );
  }
  return (
    <main>
      <BlogPosts posts={posts} />
    </main>
  );
}
