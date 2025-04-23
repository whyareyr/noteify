"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/lib/supabase/database.types";
import { format } from "date-fns";

type Note = Database["public"]["Tables"]["notes"]["Row"];

interface NoteGridProps {
  notes: Note[];
}

export function NoteGrid({ notes }: NoteGridProps) {
  const router = useRouter();

  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {notes.map((note) => (
        <Card 
          key={note.id} 
          className="cursor-pointer transition-all hover:shadow-md"
          onClick={() => router.push(`/dashboard/note/${note.id}`)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{note.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            {note.summary ? (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Summary:</p>
                <p className="text-sm">{truncateText(note.summary, 150)}</p>
              </div>
            ) : (
              <p className="text-sm">{truncateText(note.content, 150)}</p>
            )}
          </CardContent>
          <CardFooter className="pt-2 text-xs text-muted-foreground">
            {format(new Date(note.updated_at), "MMM d, yyyy 'at' h:mm a")}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}