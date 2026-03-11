'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TrainerCard from '@/components/cards/TrainerCard';
import Loader from '@/components/ui/Loader';
import { trainerService } from '@/lib/services/trainerService';
import { Trainer } from '@/lib/types';

const sampleTrainers: Trainer[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    email: 'arjun@ironforge.fit',
    phone: '9876543210',
    specialization: ['Strength Training', 'Muscle Building', 'HIIT'],
    experience: 8,
    bio: 'Former national-level powerlifter with 8 years of coaching experience. Arjun specializes in strength and hypertrophy training.',
    assignedMembers: [],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Priya Nair',
    email: 'priya@ironforge.fit',
    phone: '9876543211',
    specialization: ['Yoga', 'Pilates', 'Weight Loss'],
    experience: 6,
    bio: 'Certified yoga instructor and Pilates coach. Priya\'s holistic approach to fitness blends mindfulness with movement.',
    assignedMembers: [],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Vikram Malhotra',
    email: 'vikram@ironforge.fit',
    phone: '9876543212',
    specialization: ['CrossFit', 'Cardio', 'Functional Training'],
    experience: 10,
    bio: 'CrossFit Level 2 trainer and functional fitness expert. Vikram has trained athletes across multiple sports disciplines.',
    assignedMembers: [],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    email: 'sneha@ironforge.fit',
    phone: '9876543213',
    specialization: ['Nutrition', 'Weight Loss', 'Rehabilitation'],
    experience: 5,
    bio: 'Sports nutritionist and fitness coach certified in rehabilitation exercise. Sneha takes a science-based approach to wellness.',
    assignedMembers: [],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Rajesh Kumar',
    email: 'rajesh@ironforge.fit',
    phone: '9876543214',
    specialization: ['Boxing', 'Strength Training', 'HIIT'],
    experience: 12,
    bio: 'Former professional boxer turned fitness coach. Rajesh brings intensity and discipline to every training session.',
    assignedMembers: [],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Ananya Gupta',
    email: 'ananya@ironforge.fit',
    phone: '9876543215',
    specialization: ['Yoga', 'Cardio', 'Functional Training'],
    experience: 7,
    bio: 'Certified personal trainer with expertise in functional movement. Ananya creates sustainable programs for long-term results.',
    assignedMembers: [],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>(sampleTrainers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trainerService.getActive()
      .then((data) => { if (data.length > 0) setTrainers(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16">
        <section className="py-24 px-4 text-center bg-[#0a0a0a] border-b border-[#1f1f1f]">
          <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white mb-4">
            OUR <span className="text-red-500">TRAINERS</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            World-class coaches dedicated to your transformation.
          </p>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainers.map((trainer) => (
                  <TrainerCard key={trainer.id} trainer={trainer} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
