import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your App" },
      { name: "description", content: "Replace this with a one-sentence description of your app." },
      { property: "og:title", content: "Your App" },
      { property: "og:description", content: "Replace this with a one-sentence description of your app." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const w = window as unknown as { UnicornStudio?: { isInitialized: boolean; init: () => void } };
    const ensureInit = () => {
      if (w.UnicornStudio && !w.UnicornStudio.isInitialized) {
        w.UnicornStudio.init();
        w.UnicornStudio.isInitialized = true;
      }
    };
    if (w.UnicornStudio) {
      ensureInit();
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.25/dist/unicornStudio.umd.js";
    script.onload = ensureInit;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black">
      <div
        ref={bgRef}
        data-us-project="tnAhw4e67txvvqrBP7oz"
        data-us-scale="1"
        data-us-dpi="1.5"
        data-us-disablemobile="false"
        className="fixed inset-0 block w-screen overflow-hidden"
        style={{ height: "100vh", minHeight: "100dvh" }}
      />
      <iframe
        ref={iframeRef}
        src="/portfolio.html"
        title="Portfolio"
        className="fixed inset-0 h-screen w-screen border-0"
        style={{ background: "transparent", zIndex: 10 }}
        allow="autoplay"
        onLoad={() => {
          const iframe = iframeRef.current;
          const bg = bgRef.current;
          if (!iframe || !bg) return;
          const doc = iframe.contentDocument;
          const win = iframe.contentWindow;
          if (!doc || !win) return;
          const forward = (e: MouseEvent) => {
            const target = bg.querySelector("canvas") as HTMLElement | null;
            const el = target ?? bg;
            const rect = el.getBoundingClientRect();
            el.dispatchEvent(
              new MouseEvent("mousemove", {
                bubbles: true,
                cancelable: true,
                clientX: rect.left + e.clientX,
                clientY: rect.top + e.clientY,
                movementX: e.movementX,
                movementY: e.movementY,
              })
            );
          };
          doc.addEventListener("mousemove", forward, { passive: true });
        }}
      />
    </div>
  );
}
