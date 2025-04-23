"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StickyNote, Plus } from "lucide-react";

export function EmptyState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
          <StickyNote className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No notes yet</h2>
        <p className="text-muted-foreground mb-6">
          Create your first note to get started. You can add text, 
          format it, and even let AI summarize it for you.
        </p>
        <Button 
          onClick={() => router.push("/dashboard/new")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create your first note
        </Button>
      </div>
    </div>
  );
}