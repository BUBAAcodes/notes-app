import { getNotebookById } from "@/server/notebooks";
import { PageWrapper } from "@/components/page-wrapper";
import NoteCard from "@/components/note-card";
type Params  = Promise<{
    notebookId: string;
}>;

export default async function NotePage({params}:{params:Params}) { 
    const { notebookId } = await params;
    const { notebook }  = await getNotebookById(notebookId);
    return <PageWrapper breadcrumbs={[
                {label:"Dashboard",href:"/dashboard"},
                {label:notebook?.name ?? "Notebook",href:`/dashboard/notebook/${notebookId}`},
                ]} >
        
              <h1>{notebook?.name}</h1>
              {notebook?.notes?.map((note) => (
                <NoteCard   key={note.id} note={note}/>
              ))}
             
             
           </PageWrapper>;
}