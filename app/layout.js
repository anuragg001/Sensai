import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";


export const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Ai Carrer Guide",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            <main className="min-h-screen">
              {children}
            </main>

            {/* footer */}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-400" >
                <p>
                  Made with 😈 by Anurag Jaiswal
                </p>
              </div>
            </footer>
          </ThemeProvider>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
