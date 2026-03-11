import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16">
        <section className="py-24 px-4 text-center bg-[#0a0a0a] border-b border-[#1f1f1f]">
          <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white mb-4">
            CONTACT <span className="text-red-500">US</span>
          </h1>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-3xl font-black text-white uppercase mb-8">
                Get In <span className="text-[#00d4ff]">Touch</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: '📍', label: 'Address', value: '123 Iron Street, Bandra West, Mumbai, MH 400050' },
                  { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
                  { icon: '✉️', label: 'Email', value: 'info@ironforge.fit' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start space-x-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-gray-500 text-sm">{item.label}</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Opening Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday – Friday</span>
                    <span className="text-white">5:00 AM – 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white">6:00 AM – 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-white">7:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-br from-red-900/20 to-transparent border border-red-500/20 rounded-xl p-6 text-center">
                <p className="text-white font-semibold mb-2">Free Trial Available!</p>
                <p className="text-gray-400 text-sm mb-4">Walk in any day for a free one-day trial pass.</p>
                <a
                  href="/register"
                  className="inline-block px-6 py-2 bg-red-500 text-white font-semibold rounded-lg text-sm hover:bg-red-600 transition-colors"
                >
                  Claim Free Trial
                </a>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-8">
              <h3 className="text-white font-semibold text-lg mb-6">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
