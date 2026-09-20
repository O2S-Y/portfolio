import type { NextConfig } from "next";
import os from "node:os";

// Dynamically collect all IPv4 addresses across all network adapters (Wi-Fi, Ethernet, Hotspots)
function getDevOrigins(): string[] {
  const origins = new Set<string>([
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "localhost:3000",
    "127.0.0.1:3000",
  ]);

  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === "IPv4" && !iface.internal) {
          origins.add(iface.address);
          origins.add(`${iface.address}:3000`);
        }
      }
    }
  } catch {
    // Fallback if OS network inspection fails
  }

  return Array.from(origins);
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    // Ignore TypeScript errors in auto-generated Figma Make design files (e.g. 1024WLight, etc.)
    ignoreBuildErrors: true,
  },
  // Allow any device connecting over local Wi-Fi / LAN to access dev resources & HMR
  allowedDevOrigins: getDevOrigins(),
};

export default nextConfig;
