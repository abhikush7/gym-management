import Link from 'next/link';
import RegisterForm from '@/components/forms/RegisterForm';

export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-1 mb-6">
            <span className="font-display text-3xl font-bold text-white">IRON</span>
            <span className="font-display text-3xl font-bold text-red-500">FORGE</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mt-2">Start your transformation today</p>
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-8">
          <RegisterForm />
          <p className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-[#00d4ff] hover:text-white transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
