import { Logo } from '@/components/logo'




export default function Footer() {
    return (
        <footer className="border-t bg-background/50 pb-8 pt-6 backdrop-blur-3xl">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mb-4 flex items-center justify-center space-x-2">
                    <Logo />
                    <span className="text-lg font-semibold">Notliy</span>
                </div>
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Notliy, All rights reserved </span>
            </div>
        </footer>
    )
}
