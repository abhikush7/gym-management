import lazyLoad from 'next/dynamic';
import Link from 'next/link';
import PricingCard from '@/components/cards/PricingCard';
import ContactForm from '@/components/forms/ContactForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const revalidate = 0;

const HeroCanvas = lazyLoad(() => import('@/components/three/HeroCanvas'), { ssr: false });

const defaultPlans = [
  {
    name: 'Starter',
    price: 999,
    duration: 1,
    features: ['Access to gym floor', 'Locker facility', 'Basic equipment', 'Free fitness assessment'],
    isPopular: false,
  },
  {
    name: 'Pro',
    price: 1999,
    duration: 1,
    features: ['Everything in Starter', 'Personal trainer (4 sessions)', 'Diet consultation', 'Sauna & pool access', 'Group classes'],
    isPopular: true,
  },
  {
    name: 'Elite',
    price: 3999,
    duration: 1,
    features: ['Everything in Pro', 'Unlimited PT sessions', 'Custom workout plan', 'Nutrition plan', 'Priority booking', '24/7 access'],
    isPopular: false,
  },
];

const features = [
  { icon: '🏋️', title: 'Premium Equipment', desc: 'State-of-the-art machines and free weights from top brands.' },
  { icon: '👨‍🏫', title: 'Expert Trainers', desc: 'Certified professionals dedicated to your transformation.' },
  { icon: '📊', title: 'Track Progress', desc: 'Monitor your workouts, diet, and achievements in real-time.' },
  { icon: '🥗', title: 'Nutrition Plans', desc: 'Personalized diet plans crafted by certified nutritionists.' },
  { icon: '🤸', title: 'Group Classes', desc: 'Over 50 weekly group classes — yoga, HIIT, boxing, and more.' },
  { icon: '📱', title: 'Member Portal', desc: 'Manage your membership, bookings, and progress digitally.' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroCanvas />
        </div>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="font-display text-6xl md:text-8xl font-black uppercase leading-none mb-6">
            FORGE YOUR{' '}
            <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              LEGACY
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join IronForge — where champions are built. Premium equipment, world-class trainers, and a community that pushes you beyond limits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-lg text-lg transition-all hover:shadow-lg hover:shadow-red-500/25"
            >
              START TODAY
            </Link>
            <Link
              href="/plans"
              className="px-8 py-4 border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 font-bold rounded-lg text-lg transition-all"
            >
              VIEW PLANS
            </Link>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0a0a0a] border-y border-[#1f1f1f] py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '500+', label: 'Members' },
            { value: '20+', label: 'Trainers' },
            { value: '15+', label: 'Years' },
            { value: '98%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-black text-[#00d4ff] neon-blue">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white mb-4">
              WHY CHOOSE <span className="text-red-500">IRONFORGE</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to achieve your fitness goals, all in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 hover:border-[#00d4ff]/20 transition-all group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white mb-4">
              MEMBERSHIP <span className="text-red-500">PLANS</span>
            </h2>
            <p className="text-gray-400">Choose the plan that fits your goals and budget.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {defaultPlans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-red-900/20 to-black border-y border-red-500/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase text-white mb-6">
            READY TO{' '}
            <span className="text-red-500">TRANSFORM?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Your journey to the best version of yourself starts here. Join hundreds of members who've already transformed their lives.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-lg text-lg transition-all hover:shadow-lg hover:shadow-red-500/25"
          >
            JOIN NOW — FREE TRIAL
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-black uppercase text-white mb-4">
              GET IN <span className="text-[#00d4ff]">TOUCH</span>
            </h2>
          </div>
          <div className="max-w-2xl mx-auto bg-[#111111] border border-[#1f1f1f] rounded-xl p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
