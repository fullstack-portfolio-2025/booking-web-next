import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from 'next/constants';
import type { NextConfig } from 'next';

export default (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;        // next dev
  const isBuild = phase === PHASE_PRODUCTION_BUILD;        // next build
  const isProdServer = phase === PHASE_PRODUCTION_SERVER;  // next start

  const BOOKING_BASE = isDev
    ? 'http://localhost:4020'
    : process.env.BOOKING_API_BASE_URL ?? 'https://api.bookora.example.com';

  return {
    async rewrites() {
      return [{ source: '/api/bookora/:path*', destination: `${BOOKING_BASE}/:path*` }];
    },
  };
};
