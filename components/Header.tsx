import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-brand-gray sticky top-0 bg-brand-darker/95 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">HA</span>
            </div>
            <span className="text-xl font-bold">HACODE SOLUTIONS</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/catalog"
              className="hover:text-brand-purple transition-colors"
            >
              DevSpecs
            </Link>
            <Link
              href="/repositories"
              className="hover:text-brand-purple transition-colors"
            >
              Repositories
            </Link>
            <Link
              href="/how-it-works"
              className="hover:text-brand-purple transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="hover:text-brand-purple transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-brand-purple transition-colors"
            >
              Contact
            </Link>
          </div>

          <Link
            href="/catalog"
            className="bg-brand-purple hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Browse DevSpecs
          </Link>
        </div>
      </nav>
    </header>
  );
}
