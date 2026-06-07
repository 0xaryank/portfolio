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
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div
        data-us-project="tnAhw4e67txvvqrBP7oz"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
