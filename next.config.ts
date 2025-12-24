/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during production builds
  },
};

export default nextConfig;