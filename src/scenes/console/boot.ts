// Orbital Console boot — capability probe + lazy engine load.
// Fallback ladder (DESIGN.md v2 §4): reduced-motion OR no WebGL OR engine
// failure → html.no-3d (static poster background, content reveals still work).
// three.js loads as a separate lazy chunk after first paint (LCP guard).
import type { ConsoleHandle } from './engine';

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export async function bootConsole(canvas: HTMLCanvasElement): Promise<ConsoleHandle | null> {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !webglAvailable()) {
    document.documentElement.classList.add('no-3d');
    return null;
  }
  const nav = navigator as Navigator & { deviceMemory?: number };
  const mobile = innerWidth < 860 || (nav.deviceMemory !== undefined && nav.deviceMemory < 4);
  try {
    const { createConsole } = await import('./engine');
    const handle = createConsole(canvas, { mobile });
    document.documentElement.classList.add('has-3d');
    return handle;
  } catch {
    document.documentElement.classList.add('no-3d');
    return null;
  }
}
