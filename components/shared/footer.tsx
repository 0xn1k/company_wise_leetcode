import Link from "next/link";
import type { SVGProps } from "react";

const AUTHOR_NAME = "Nishant";
const GITHUB_USERNAME = "0xn1k";
const LINKEDIN_URL = "https://www.linkedin.com/in/0xn1k/";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.27 7.77 10.77.57.1.78-.25.78-.55v-2.1c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.73.4-1.24.72-1.52-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55 4.5-1.5 7.76-5.75 7.76-10.77C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 border-t py-6 text-sm text-muted-foreground">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p>
          Built by{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground hover:text-primary"
          >
            {AUTHOR_NAME}
          </a>
        </p>
        <div className="flex items-center gap-3">
          <Link
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-primary"
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
          <Link
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary"
          >
            <LinkedinIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
