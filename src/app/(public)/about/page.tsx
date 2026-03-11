import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const facilities = [
  '🏋️ Free Weights Zone', '🚴 Cardio Floor', '🥊 Boxing Ring', '🧘 Yoga Studio',
  '🏊 Swimming Pool', '🛁 Sauna & Steam', '🥗 Nutrition Bar', '📱 Smart Tracking',
];

const values = [
  { icon: '🎯', title: 'Our Mission', desc: 'To empower every individual to achieve their peak physical and mental performance through world-class training and community.' },
  { icon: '👁️', title: 'Our Vision', desc: 'To be the most innovative gym in India, where technology meets fitness excellence.' },
  { icon: '💡', title: 'Our Values', desc: 'Excellence, integrity, and inclusivity. We believe every body is a work in progress worth investing in.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16">
        <section className="py-24 px-4 text-center bg-[#0a0a0a] border-b border-[#1f1f1f]">
          <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white mb-4">
            ABOUT <span className="text-red-500">IRONFORGE</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Built for warriors. Designed for champions.
          </p>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl h-80 flex items-center justify-center text-8xl">
              🏋️‍♂️
            </div>
            <div>
              <h2 className="font-display text-3xl font-black text-white uppercase mb-6">
                Our <span className="text-[#00d4ff]">Story</span>
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>Founded in 2009, IronForge started as a small warehouse gym in Mumbai with just 50 members and a dream — to create a fitness community like no other in India.</p>
                <p>Over 15 years, we've grown into a premium fitness destination with 500+ members, 20+ certified trainers, and cutting-edge facilities that rival the best gyms in the world.</p>
                <p>Today, IronForge is more than a gym. It's a movement. A lifestyle. A commitment to becoming the best version of yourself.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="font-display text-xl font-bold text-white uppercase mb-3">{v.title}</h3>
                  <p className="text-gray-400 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-4xl font-black text-white uppercase text-center mb-12">
              OUR <span className="text-red-500">FACILITIES</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {facilities.map((f) => (
                <div key={f} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4 text-center hover:border-[#00d4ff]/30 transition-all">
                  <p className="text-gray-300 text-sm">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
