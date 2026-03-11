import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransformationCard from '@/components/cards/TransformationCard';

const transformations = [
  {
    name: 'Rahul M.',
    duration: '6 months',
    testimonial: 'Lost 22kg and gained confidence I never had. IronForge changed my life completely.',
  },
  {
    name: 'Priya S.',
    duration: '3 months',
    testimonial: 'From zero fitness to running 10km. The trainers here are absolutely incredible.',
  },
  {
    name: 'Aditya K.',
    duration: '1 year',
    testimonial: 'Went from skinny to athletic. The structured program and nutrition guidance made all the difference.',
  },
  {
    name: 'Kavya R.',
    duration: '4 months',
    testimonial: 'Post-pregnancy transformation. Lost all the weight and feel stronger than ever!',
  },
  {
    name: 'Suresh P.',
    duration: '8 months',
    testimonial: 'Managed to reverse my pre-diabetic condition through fitness. The team here truly cares.',
  },
  {
    name: 'Meera T.',
    duration: '5 months',
    testimonial: 'Never thought I\'d enjoy working out. IronForge made fitness fun and sustainable.',
  },
];

export default function TransformationsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16">
        <section className="py-24 px-4 text-center bg-[#0a0a0a] border-b border-[#1f1f1f]">
          <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white mb-4">
            REAL <span className="text-red-500">RESULTS</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Inspiring stories from our members who transformed their lives.
          </p>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transformations.map((t, i) => (
              <TransformationCard key={i} {...t} />
            ))}
          </div>
        </section>

        <section className="py-16 px-4 bg-[#0a0a0a] border-y border-[#1f1f1f] text-center">
          <h2 className="font-display text-3xl font-black text-white uppercase mb-4">
            YOUR STORY STARTS <span className="text-[#00d4ff]">TODAY</span>
          </h2>
          <p className="text-gray-400 mb-8">Join hundreds of members who've already started their transformation journey.</p>
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
          >
            Start Your Transformation
          </a>
        </section>
      </div>
      <Footer />
    </main>
  );
}
