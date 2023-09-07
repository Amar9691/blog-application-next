import Link from "next/link";
import type { SanityDocument } from "@sanity/client";
import Post from "./Post";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import ClientSideRoute from "@/components/ClientSideRoute";
const builder = imageUrlBuilder(client);

export default function BlogPosts({ posts = [] }: { posts: SanityDocument[] }) {
  const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;

  return (
    <div>
      <hr className="border-[#F7ABBA] mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-10 gay-y-16 pb-24">
        {posts.map((post) => (
          <ClientSideRoute key={post._id} route={`/${post.slug.current}`}>
            <div className="flex flex-col group cursor-pointer">
              <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                <Image
                  className="object-cover object-left lg:object-center"
                  src={builder.image(post.mainImage).url()}
                  alt={post.author.name}
                  fill
                />
                <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blue-lg rounded drop-shadow-lg text-white p-5 flex justify-between">
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <p>
                      {new Date(post._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
                    {post.categories.map((category: any) => (
                      <div
                        key={category._id}
                        className="bg-[#F7ABBA] text-center text-black px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        <p>{category.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex-1">
                <p className="underline text-lg font-bold">{post.title}</p>
                <p className="line-clamp-2 text-gray-500">{post.description}</p>
              </div>
              <p className="mt-5 font-bold flex items-center group-hover:underline">
                Read Post
                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
              </p>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
}
