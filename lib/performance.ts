export type QualityPreset = "low" | "medium" | "high";

/** Heuristic tier from device + WebGL renderer (no external perf APIs). */
export function detectGPUQuality(): QualityPreset {
  if (typeof window === "undefined") return "medium";

  const ua = navigator.userAgent;
  const isMobile =
    /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
    window.innerWidth < 768 ||
    "ontouchstart" in window;

  const nav = navigator as Navigator & { deviceMemory?: number };
  const mem = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 4;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
    if (gl && "getParameter" in gl) {
      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      if (dbg) {
        const renderer = (gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) as string).toLowerCase();
        if (
          renderer.includes("swiftshader") ||
          renderer.includes("llvmpipe") ||
          renderer.includes("microsoft basic")
        ) {
          return "low";
        }
      }
    }
  } catch {
    /* ignore */
  }

  if (isMobile) {
    if (mem <= 4 || cores <= 4) return "low";
    return "medium";
  }

  if (mem >= 8 && cores >= 8 && window.innerWidth >= 1280) return "high";
  return "medium";
}
