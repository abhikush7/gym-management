import ClientGuard from '@/lib/guards/ClientGuard';
import ClientSidebar from '@/components/layout/ClientSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientGuard>
      <div className="min-h-screen bg-black">
        <ClientSidebar />
        <div className="ml-64">
          <DashboardHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ClientGuard>
  );
}
