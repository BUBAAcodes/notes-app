"use server";
import { db } from "@/db/drizzle";
import { InsertNote, notes} from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export const createNote = async (values:InsertNote) => {
    try {
        
         await db.insert(notes).values(values);
         return {success:true, message:"Notebook created succefully"};

    } catch (error) {
        return {success:false,message:"Failed to create notebook"};
    }
};



export const getNoteById = async (id: string) => {
    try {
        const note = await db.select().from(notes).where(eq(notes.id, id));

        return { success: true, note };
    } catch {
        return { success: false, message: "Failed to get notebook" };
    }
};


export const updateNote= async (id:string, values:InsertNote) => {
    try {
        await db.update(notes).set(values).where(eq(notes.id,id));
        return {success:true, message:"Notebook updated successfully"};
    } catch (error) {
        return {success:false, message:"Failed to update notebook"};
    }
};

export const deleteNote = async (id:string) => { 
    try {
        await db.delete(notes).where(eq(notes.id,id));
        return {success:true, message:"Notebook deleted successfully"};
    } catch (error) {
        return {success:false, message:"failed to delete notebook"};
    }
};