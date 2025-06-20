"use client"
import { UserInfo } from "@/components/auth/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
    const user = useCurrentUser()
    return (
        <UserInfo user={user} label="Client Side Component" />
    )
}

export default ClientPage