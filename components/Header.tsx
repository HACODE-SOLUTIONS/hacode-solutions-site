import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-brand-border sticky top-0 bg-brand-black/95 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">HA</span>
            </div>
            <span className="text-lg font-medium">HACODE SOLUTIONS</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/catalog"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              DevSpecs
            </Link>
            <Link
              href="/repositories"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Repositories
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Contact
            </Link>
          </div>

          <Link
            href="/catalog"
            className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded text-sm font-medium transition-colors"
          >
            Browse DevSpecs
          </Link>
        </div>
      </nav>
    </header>
  );
}
