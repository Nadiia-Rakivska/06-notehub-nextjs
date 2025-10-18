import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface NotePageProps {
  params: Promise<{ noteId: string; page: number }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { noteId, page } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId, page],
    queryFn: () => fetchNotes(noteId, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
