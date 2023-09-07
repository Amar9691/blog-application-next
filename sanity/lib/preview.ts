"use client";

import definePreview from "next-sanity/preview";
import { dataset, projectId } from "../env";

function onPublicAccessOnly() {
  throw new Error("Unable to load preview as you're not logged in");
}

if (!projectId || !dataset) {
  throw new Error(
    `Missing projectId or dataset. Check your environment configuration`
  );
}

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly,
});
