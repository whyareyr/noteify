"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { useNotes } from "@/hooks/use-notes";
import { NoteGrid } from "@/components/dashboard/note-grid";
import { EmptyState } from "@/components/dashboard/empty-state";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { notes, isLoading: notesLoading } = useNotes();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-8 w-48 bg-muted rounded"></div>
            <div className="h-40 w-full max-w-3xl bg-muted rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {notesLoading ? (
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 bg-muted rounded-md"></div>
          ))}
        </div>
      ) : notes && notes.length > 0 ? (
        <NoteGrid notes={notes} />
      ) : (
        <EmptyState />
      )}
    </DashboardLayout>
  );
}
