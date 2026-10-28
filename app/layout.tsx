import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarNav } from "@/components/shared/sidebar-nav";
import { Footer } from "@/components/shared/footer";
import { BookmarkReminderModal } from "@/components/shared/bookmark-reminder-modal";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — LeetCode Prep by Company`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "leetcode",
    "company wise leetcode questions",
    "coding interview prep",
    "leetcode tracker",
    "technical interview questions",
    "DSA practice",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — LeetCode Prep by Company`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — LeetCode Prep by Company`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex">
        <TooltipProvider>
          <SidebarNav />
          <div className="flex min-h-screen w-full min-w-0 flex-1 flex-col">
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
              <Footer />
            </div>
          </div>
        </TooltipProvider>
        <BookmarkReminderModal />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
