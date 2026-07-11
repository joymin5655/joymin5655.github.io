// Observatory snapshot — static, hand-stamped. SSOT rules: DESIGN.md §8.
//
// VERIFIED numbers (session_summary_report.md): totalRequests, countryCount,
// windowDays, observedAt. Everything else in this file (country coordinates,
// weights, daily shape) is ILLUSTRATIVE visual material for the hero canvas —
// per-country / per-day figures are NOT verified and MUST NEVER be rendered
// as labeled numbers. Only the verified totals may appear as text on screen.
//
// When a public stats Worker exists, implement ObservatoryAdapter against it
// and swap `staticSnapshot` — components consume the interface only.

export interface ObservatorySnapshot {
  observedAt: string; // shown on screen as LAST OBSERVED
  windowDays: number;
  totalRequests: number;
  countryCount: number;
  target: { lat: number; lon: number }; // arc destination (Seoul / origin server region)
  countries: { lat: number; lon: number; w: number }[]; // illustrative spread
  dailyRequests: number[]; // relative 0..1, illustrative waveform shape
}

export interface ObservatoryAdapter {
  load(): ObservatorySnapshot;
}

const staticSnapshot: ObservatorySnapshot = {
  observedAt: '2026-07-11',
  windowDays: 30,
  totalRequests: 66307,
  countryCount: 55,
  target: { lat: 37.57, lon: 126.98 },
  countries: [
    { lat: 38, lon: -97, w: 1 },
    { lat: 56, lon: -106, w: 0.5 },
    { lat: 23, lon: -102, w: 0.4 },
    { lat: -10, lon: -52, w: 0.6 },
    { lat: -34, lon: -64, w: 0.3 },
    { lat: -33, lon: -71, w: 0.3 },
    { lat: 4, lon: -73, w: 0.3 },
    { lat: -9, lon: -75, w: 0.2 },
    { lat: 54, lon: -2, w: 0.8 },
    { lat: 46, lon: 2, w: 0.7 },
    { lat: 51, lon: 10, w: 0.8 },
    { lat: 40, lon: -4, w: 0.5 },
    { lat: 39, lon: -8, w: 0.3 },
    { lat: 42, lon: 12, w: 0.5 },
    { lat: 52, lon: 5, w: 0.5 },
    { lat: 50, lon: 4, w: 0.3 },
    { lat: 47, lon: 8, w: 0.4 },
    { lat: 47, lon: 14, w: 0.3 },
    { lat: 52, lon: 19, w: 0.4 },
    { lat: 49, lon: 15, w: 0.3 },
    { lat: 62, lon: 15, w: 0.4 },
    { lat: 61, lon: 8, w: 0.3 },
    { lat: 64, lon: 26, w: 0.3 },
    { lat: 56, lon: 10, w: 0.3 },
    { lat: 53, lon: -8, w: 0.3 },
    { lat: 49, lon: 32, w: 0.3 },
    { lat: 39, lon: 35, w: 0.4 },
    { lat: 39, lon: 22, w: 0.3 },
    { lat: 46, lon: 25, w: 0.3 },
    { lat: 47, lon: 19, w: 0.3 },
    { lat: 60, lon: 90, w: 0.4 },
    { lat: 21, lon: 78, w: 0.9 },
    { lat: 35, lon: 103, w: 0.7 },
    { lat: 36, lon: 138, w: 0.8 },
    { lat: 23.7, lon: 121, w: 0.5 },
    { lat: 22.3, lon: 114.2, w: 0.5 },
    { lat: 1.35, lon: 103.8, w: 0.6 },
    { lat: 4, lon: 102, w: 0.4 },
    { lat: -2, lon: 118, w: 0.5 },
    { lat: 15, lon: 101, w: 0.5 },
    { lat: 16, lon: 106, w: 0.5 },
    { lat: 13, lon: 122, w: 0.4 },
    { lat: -25, lon: 134, w: 0.6 },
    { lat: -42, lon: 172, w: 0.3 },
    { lat: 24, lon: 45, w: 0.4 },
    { lat: 24, lon: 54, w: 0.4 },
    { lat: 31, lon: 35, w: 0.3 },
    { lat: 26, lon: 30, w: 0.3 },
    { lat: -29, lon: 25, w: 0.4 },
    { lat: 9, lon: 8, w: 0.4 },
    { lat: 0.5, lon: 38, w: 0.3 },
    { lat: 32, lon: -6, w: 0.3 },
    { lat: 30, lon: 69, w: 0.4 },
    { lat: 24, lon: 90, w: 0.4 },
    { lat: 48, lon: 68, w: 0.3 },
  ],
  dailyRequests: [
    0.42, 0.38, 0.45, 0.5, 0.47, 0.36, 0.33, 0.48, 0.55, 0.52, 0.6, 0.58, 0.44, 0.4, 0.57,
    0.63, 0.61, 0.68, 0.54, 0.49, 0.66, 0.72, 0.7, 0.65, 0.58, 0.74, 0.8, 0.77, 0.85, 1,
  ],
};

export const observatory: ObservatoryAdapter = { load: () => staticSnapshot };
