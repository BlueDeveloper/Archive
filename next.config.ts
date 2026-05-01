import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

if (process.env.NODE_ENV === "development") {
  // @ts-expect-error experimentalRemote는 런타임에서만 사용
  setupDevPlatform({ persist: true, configPath: "wrangler.toml", experimentalRemote: true }).catch(() => {});
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  }
};

export default nextConfig;
