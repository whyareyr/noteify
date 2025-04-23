"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { useAuth } from "@/components/auth-provider";
import { useNotes } from "@/hooks/use-notes";
import { ArrowLeft, Trash, Save, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

export default function NotePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { getNote, updateNote, deleteNote, generateSummary, isSummarizing } =
    useNotes();

  const {
    data: note,
    isLoading: noteLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNote(id),
    enabled: !!user && !!id,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsSubmitting(true);
    try {
      await updateNote({ id, title, content });
      setIsEditing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    await deleteNote(id);
    router.push("/dashboard");
  };

  const handleSummarize = async () => {
    await generateSummary({ id, content });
  };

  if (authLoading || noteLoading) {
    return (
      <DashboardLayout>
        <div className="container max-w-4xl py-6 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/2 bg-muted rounded"></div>
            <div className="h-64 w-full bg-muted rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !note) {
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
            <h1 className="text-2xl font-bold">Note not found</h1>
          </div>
          <p className="text-muted-foreground">
            The note you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have permission to view it.
          </p>
          <Button className="mt-4" onClick={() => router.push("/dashboard")}>
            Go to dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container max-w-4xl py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            {!isEditing && <h1 className="text-2xl font-bold">{note.title}</h1>}
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                >
                  <Lightbulb className="h-4 w-4" />
                  {isSummarizing ? "Summarizing..." : "Summarize"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this note.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
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
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setTitle(note.title);
                  setContent(note.content);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !title || !content}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="whitespace-pre-wrap text-base leading-relaxed">
              {isContentExpanded || note.content.length < 600
                ? note.content
                : `${note.content.slice(0, 600)}...`}
              {note.content.length >= 600 && (
                <button
                  onClick={() => setIsContentExpanded((prev) => !prev)}
                  className="text-blue-600 underline ml-2"
                >
                  {isContentExpanded ? "Read Less" : "Read More"}
                </button>
              )}
            </div>

            {note.summary && (
              <>
                <Separator />
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="font-normal">
                        AI Summary
                      </Badge>
                    </div>
                    <p className="text-sm">{note.summary}</p>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="flex items-center text-xs text-muted-foreground">
              <span>
                Last updated:{" "}
                {format(new Date(note.updated_at), "MMMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
