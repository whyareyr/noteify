"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { useAuth } from "@/components/auth-provider";
import { useNotes } from "@/hooks/use-notes";
import { ArrowLeft } from "lucide-react";

export default function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { createNote } = useNotes();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsSubmitting(true);
    try {
      await createNote({ title, content });
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <DashboardLayout>
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-48 bg-muted rounded"></div>
          <div className="h-40 w-full max-w-3xl bg-muted rounded"></div>
        </div>
      </div>
    </DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="container max-w-4xl py-6 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold">Create New Note</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] resize-none border rounded-md p-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !title || !content}
            >
              {isSubmitting ? "Saving..." : "Save Note"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}