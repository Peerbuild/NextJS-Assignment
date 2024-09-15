
export default function BackgroundLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,_#031615_5%,_#021211_9%,_#010808_20%,_#000101_40%,_#000101_100%)] text-white overflow-hidden">
            
            <div className="absolute inset-0 pointer-events-none">
                <div className="grid-pattern h-full w-full opacity-100" />
            </div>

            
            <main className="flex-grow ">
                {children}
            </main>
        </div>
    );
}
