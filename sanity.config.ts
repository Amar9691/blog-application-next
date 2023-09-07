import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { myTheme } from "./theme";
import Logo from "@/components/Logo";
import StudioNavbar from "@/components/StudioNavbar";
import { SanityDocument } from "next-sanity";
import Iframe from "sanity-plugin-iframe-pane";
import { defaultDocumentNode } from "@/sanity/desk/defaultDocumentNode";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
function getPreviewUrl(doc: SanityDocument) {
  return doc?.slug?.current
    ? `${window.location.host}/${doc.slug.current}`
    : window.location.host;
}

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,

  plugins: [
    deskTool({ defaultDocumentNode }),
    defaultDocumentNode,
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  theme: myTheme,
  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar,
    },
  },
  document: {
    // prev is the result from previous plugins and thus can be composed
    productionUrl: async (prev, context) => {
      // context includes the client and other details
      const { getClient, dataset, document } = context;
      const client = getClient({ apiVersion: "2023-05-31" });

      if (document._type === "post") {
        const slug = await client.fetch(
          `*[_type == 'routeInfo' && post._ref == $postId][0].slug.current`,
          { postId: document._id }
        );
        const params = new URLSearchParams();
        params.set("preview", "true");
        params.set("dataset", dataset);
        return `http://localhost:3000/posts/${slug}?${params}`;
      }

      return prev;
    },
  },
});
