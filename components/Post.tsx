"use client";

import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import category from "@/sanity/schemas/category";
import author from "@/sanity/schemas/author";
import {
  CalendarDaysIcon,
  CalendarIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";

const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <section className="px-10 h-auto py-10 w-full">
      <div className="flex flex-cols md:flex-row items-center justify-between">
        <div className="flex flex-flex-row items-start justify-start">
          <Image
            className="rounded-full shadow-xl object-cover object-center"
            src={builder.image(post.author.image).width(80).height(80).url()}
            width={80}
            height={80}
            alt={post.author.name}
          />
          <div className="mt-6">
            <h3 className="text-lg font-bold ml-2">{post.author.name}</h3>
            <h3 className="text-sm italic font-bold text-[#01020048] ml-2">
              Blog writer
            </h3>
          </div>
        </div>

        <button className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:text-[#f26de7] hover:shadow-lg">
          <PlusCircleIcon className="h-6 w-6 inline-block mx-1" />
          Subscribe
        </button>
      </div>

      {post.author.bio.map((bio: any) => (
        <p className="italic p-2" key={bio.children[0].id}>
          {bio.children[0].text}{" "}
        </p>
      ))}

      <div className="space-y-2 w-full">
        <Image
          className="w-full object-cover"
          src={builder.image(post.mainImage).url()}
          width={200}
          height={200}
          alt={post.author.name}
        />
        <h1 className="text-2xl font-extrabold">{post.title}</h1>
        <div className="flex flex-cols md:flex-row justify-between items-center">
          <p>
            <CalendarIcon className="w-6 h-6 inline-block" />
            <span className="mx-1 italic">
              {new Date(post._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </p>
          <div className="flex items-center justify-end">
            {post.categories.map((category: any) => (
              <p
                key={category._id}
                className="bg-gray-800 text-white px-3 py-2 rounded-full text-sm font-semibold mt-4"
              >
                {category.title}
              </p>
            ))}
          </div>
        </div>

        <p className="line-clamp-2 text-gray-500">
          {post.body[0].children[0].text}
        </p>
      </div>
    </section>
  );
}
