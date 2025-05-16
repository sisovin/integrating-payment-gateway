"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Moon,
  Sun,
  Laptop,
  ChevronDown,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering theme-dependent elements after mount
  useEffect(() => {
    setMounted(true);  }, []);  return (    <footer className="w-full max-w-full border-t border-border bg-background/80 backdrop-blur-sm py-10">
      <div className="container mx-auto px-4 sm:px-6">{/* Main footer content - 5 column grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-4 md:gap-x-6 gap-y-10">
          {/* Logo & Copyright column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/vercel.svg"
                alt="Vercel"
                width={120}
                height={30}
                className="h-7 w-auto dark:invert"
              />
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              © 2025 Copa Starter Kit PayGateway
            </p>
          </div>          {/* Resources column */}
          <div className="md:col-span-2">
            <h3 className="font-medium text-base mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</Link></li>
              <li><Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</Link></li>
              <li><Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Learn</Link></li>
              <li><Link href="/showcase" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Showcase</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Analytics</Link></li>
            </ul>
          </div>          {/* More column */}
          <div className="md:col-span-2">
            <h3 className="font-medium text-base mb-4">More</h3>
            <ul className="space-y-2">
              <li><Link href="/commerce" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Commerce</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Sales</Link></li>
              <li><Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link></li>
              <li><Link href="/github" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</Link></li>
              <li><Link href="/releases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Releases</Link></li>
            </ul>
          </div>          {/* About Vercel column */}
          <div className="md:col-span-3">
            <h3 className="font-medium text-base mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="/nextjs-vercel" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Next.js + Vercel</Link></li>
              <li><Link href="/opensource" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Open Source</Link></li>
              <li><Link href="/github" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</Link></li>
              <li><Link href="/x" className="text-sm text-muted-foreground hover:text-foreground transition-colors">X</Link></li>
            </ul>

            {/* Legal section */}
            <div className="mt-6">
              <h3 className="font-medium text-base mb-2">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>          {/* Newsletter section */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="font-medium text-base mb-2">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Stay updated on new releases and features, guides, and case studies.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full pr-[40px] md:pr-2">
              <input
                type="email"
                placeholder="you@domain.com"
                className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button type="submit" className="h-10 px-4 py-2 text-sm whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom section with social links and theme switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-14 pt-8 border-t border-border">
          {/* Social media links */}
          <div className="flex items-center gap-6 mb-6 sm:mb-0">
            <a
              href="https://github.com/vercel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com/vercel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">Twitter (X)</span>
              <Twitter size={20} />
            </a>
            <a
              href="https://youtube.com/vercel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">YouTube</span>
              <Youtube size={20} />
            </a>
            <a
              href="https://linkedin.com/company/vercel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={20} />
            </a>
          </div>

          {/* Theme switcher dropdown */}
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 px-3 font-normal">
                  {theme === 'dark' && <Moon className="mr-2 h-4 w-4" />}
                  {theme === 'light' && <Sun className="mr-2 h-4 w-4" />}
                  {theme === 'system' && <Laptop className="mr-2 h-4 w-4" />}
                  {theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'System'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light" className="cursor-pointer">
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                    {theme === 'light' && <CheckIcon className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark" className="cursor-pointer">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                    {theme === 'dark' && <CheckIcon className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system" className="cursor-pointer">
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                    {theme === 'system' && <CheckIcon className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </footer>
  );
}
