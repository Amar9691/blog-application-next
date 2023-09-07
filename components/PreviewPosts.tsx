"use client";

import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import BlogPosts from "@/components/BlogPosts";
import { postsQuery } from "@/lib/queries";

export default function PreviewPosts({
  posts = [],
}: {
  posts: SanityDocument[];
}) {
  const [data] = useLiveQuery(posts, postsQuery);

  return <BlogPosts posts={data} />;
}
