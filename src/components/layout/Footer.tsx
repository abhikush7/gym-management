import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1f1f1f] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center space-x-1 mb-4">
              <span className="font-display text-2xl font-bold text-white">IRON</span>
              <span className="font-display text-2xl font-bold text-red-500">FORGE</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Build your best self at IronForge — premium gym equipment, expert trainers, and a community that pushes you further.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Trainers', 'Plans', 'Transformations', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-500 hover:text-[#00d4ff] text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Monday – Friday: 5:00 AM – 11:00 PM</li>
              <li>Saturday: 6:00 AM – 10:00 PM</li>
              <li>Sunday: 7:00 AM – 8:00 PM</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>123 Iron Street, Mumbai, MH 400001</li>
              <li>+91 98765 43210</li>
              <li>info@ironforge.fit</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {['Instagram', 'Twitter', 'Facebook'].map((s) => (
                <a key={s} href="#" className="text-gray-500 hover:text-[#00d4ff] transition-colors text-sm">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1f1f1f] text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} IronForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
