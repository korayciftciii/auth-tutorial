
import { auth } from "@/auth";
import { UserInfo } from "@/components/auth/user-info";
import NavBar from "../_components/NavBar";
const ServerPage = async () => {
    const session = await auth();
    return (
        <>
            <UserInfo user={session?.user} label="Server Component" />
        </>
    )
}

export default ServerPage;