import { useState } from "react";
import { Seo } from "@/components/Seo";
import { dashboards, photos } from "@/data/dashboards";
import { DashboardViewer } from "@/components/dashboards/DashboardViewer";
import { GalleryGrid } from "@/components/dashboards/GalleryGrid";

const tools = ["Power BI", "Power Query", "DAX"];

export default function Dashboards() {
  const [openSet, setOpenSet] = useState<"work" | "personal" | null>(null);
  const [openIndex, setOpenIndex] = useState(0);

  const activeItems = openSet === "personal" ? photos : dashboards;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Seo
        title="Gallery | Diini Kahiye"
        description="A gallery of Power BI dashboards by Diini Kahiye, built with Power Query transformations and DAX measures."
        path="/dashboards"
      />

      <header className="mb-10">
        <p className="font-mono text-xs text-primary mb-2">~/gallery</p>
        <h1 className="text-3xl font-bold text-foreground mb-3">Gallery</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Every dashboard here is built in Power BI, with the data shaped and cleaned in
          Power Query before modelling. Click any tile to view it larger.
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {tools.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md border border-primary/30 bg-primary/5 font-mono text-[11px] text-primary"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] text-muted-foreground/70">
          {dashboards.length} dashboards · {photos.length} photos
        </p>
      </header>

      <GalleryGrid
        items={dashboards}
        onOpen={(i) => {
          setOpenSet("work");
          setOpenIndex(i);
        }}
      />

      {/* Personal photos */}
      <div className="mt-12 border-t border-border/40 pt-8">
        <p className="font-mono text-xs text-primary mb-1">~/gallery/me</p>
        <h2 className="text-xl font-bold text-foreground mb-1">Besides the work</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Besides my work, here are a few pictures of me.
        </p>
        <GalleryGrid
          items={photos}
          variant="personal"
          onOpen={(i) => {
            setOpenSet("personal");
            setOpenIndex(i);
          }}
        />
      </div>

      {openSet !== null && (
        <DashboardViewer
          items={activeItems}
          index={openIndex}
          onClose={() => setOpenSet(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
