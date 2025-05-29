import NavBar from "./_components/NavBar";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-amber-50">
            <NavBar />
            {children}
        </div>
    );
}
