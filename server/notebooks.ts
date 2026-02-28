import { db } from "@/db/drizzle";
import { InsertNotebook, notebooks } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export const createNotebook = async (values:InsertNotebook) => {
    try {
        
         await db.insert(notebooks).values(values);
         return {success:true, message:"Notebook created succefully"};

    } catch (error) {
        return {success:false,message:"Failed to create notebook"};
    }
};

export const getNotebook = async () => {
try {
    const sessionData = await auth.api.getSession ({
        headers: await headers()
    });

    const userId = sessionData?.user?.id;

    if(!userId){
    return {success:false,message:"Unauthorized"};
   };
 const notebooksByUser = await db.select().from(notebooks).where(eq(notebooks.userId,userId));
    return {success:true, notebooks:notebooksByUser};
} catch (error) {
    return {success:false,message:"Failed to fetch notebooks"};
}
};

export const getNotebookById = async (notebookId: string) => {
    try {
        const notebook = await db.select().from(notebooks).where(eq(notebooks.id, notebookId));

        return { success: true, notebook };
    } catch {
        return { success: false, message: "Failed to get notebook" };
    }
};

export const updateNotebook = async (id:string, values:InsertNotebook) => {
    try {
        await db.update(notebooks).set(values).where(eq(notebooks.id,id));
        return {success:true, message:"Notebook updated successfully"};
    } catch (error) {
        return {success:false, message:"Failed to update notebook"};
    }
};

export const deleteNotebook = async (id:string) => { 
    try {
        await db.delete(notebooks).where(eq(notebooks.id,id));
        return {success:true, message:"Notebook deleted successfully"};
    } catch (error) {
        return {success:false, message:"failed to delete notebook"};
    }
};