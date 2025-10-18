import { fetchNoteById } from "@/lib/api";
import { QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "../NoteDetails.client";

interface NoteDetailsPageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const queryClient = new QueryClient();
  const id = await params.id;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <div>
      <h1>Note Details</h1>
      <NoteDetailsClient />
    </div>
  );
}
