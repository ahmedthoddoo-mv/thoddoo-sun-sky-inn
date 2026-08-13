import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Thoddoo Sun Sky Inn",
    short_name: "Sun Sky Inn",
    description:
      "Official website of Thoddoo Sun Sky Inn on Thoddoo Island, Maldives.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf8f0",
    theme_color: "#08283c",
    icons: [
      {
        src: "/images/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
