import { SanityDocument } from "@sanity/client";
import Post from "@/components/Post";
import { postPathsQuery, postQuery } from "@/lib/queries";
import { sanityFetch, token } from "@/actions/sanityFetch";
import { client } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import PreviewProvider from "@/components/PreviewProvider";
import PreviewPost from "@/components/PreviewPost";

export const revalidate = 60;

export async function generateStaticParams() {
  // Important, use the plain Sanity Client here
  const posts = await client.fetch(postPathsQuery);
  return posts;
}

export default async function Page({ params }: { params: any }) {
  const post = await sanityFetch<SanityDocument>({
    query: postQuery,
    params,
  });

  // post.author.bio.map((bio: any) => console.log(bio.children[0].text));

  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewPost post={post} />
      </PreviewProvider>
    );
  }
  return <Post post={post} />;
}
