import { Download, FileText, Image, FileCode, File } from "lucide-react";
import { clientFiles } from "@/lib/client-data";

export const metadata = { title: "Files — Brandoria" };

const iconMap = {
  PDF: FileText,
  FIG: FileCode,
  DOC: File,
  IMG: Image,
} as const;

export default function FilesPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your files</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything we&apos;ve shared with you, in one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clientFiles.map((f) => {
          const Icon = iconMap[f.type];
          return (
            <div
              key={f.id}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Download"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-4 font-semibold tracking-tight">{f.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {f.type} · {f.size} · {f.updated}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <p className="text-sm font-semibold tracking-tight">
          Share a file with us
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Drag and drop or click to upload.
        </p>
        <button className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Upload file
        </button>
      </div>
    </div>
  );
}