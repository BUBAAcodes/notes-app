"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { authclient } from "@/lib/auth-client";


export function Logout() {
            
    const router = useRouter();
    const handleLogout = async () => {
        await authclient.signOut();
        router.push("/");
    }

    return <Button variant={"outline"} onClick = {handleLogout}> Logout</Button>
}