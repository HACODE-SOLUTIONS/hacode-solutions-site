import Link from "next/link";
import Image from "next/image";

// Simple inline SVG icons for social media
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border mt-32">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 relative">
                <Image
                  src="/logo.webp"
                  alt="HACODE SOLUTIONS"
                  width={24}
                  height={24}
                  className="rounded"
                />
              </div>
              <span className="font-medium text-sm">HACODE SOLUTIONS</span>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">
              DevSpecs for AI coding agents. Structured specs and starter scaffolds.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-medium mb-4 text-sm">Product</h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/catalog" className="text-gray-500 hover:text-white transition-colors">
                  DevSpecs Catalog
                </Link>
              </li>
              <li>
                <Link href="/repositories" className="text-gray-500 hover:text-white transition-colors">
                  Repositories
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-500 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium mb-4 text-sm">Company</h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-medium mb-4 text-sm">Social</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/HACODE-SOLUTIONS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.instagram.com/hacodesolutions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-brand-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© {currentYear} HACODE SOLUTIONS. All rights reserved.</p>
            <p className="text-gray-700">Built for AI coding agents</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
