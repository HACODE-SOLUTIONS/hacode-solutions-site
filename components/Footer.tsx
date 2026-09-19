import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-brand-gray mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">HA</span>
              </div>
              <span className="font-bold">HACODE SOLUTIONS</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium DevSpec packs for AI coding agents
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  DevSpecs Catalog
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/repositories" className="hover:text-white transition-colors">
                  Repositories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-gray text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} HACODE SOLUTIONS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
