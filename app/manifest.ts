import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Whatever - 오늘 뭐 먹지?",
    short_name: "Whatever",
    description: "메뉴 고르기 힘들 때, Whatever이 골라줄게!",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f6",
    theme_color: "#e8928a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-1024.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
