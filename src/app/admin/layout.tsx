import AdminGuard from '@/lib/guards/AdminGuard';
import AdminSidebar from '@/components/layout/AdminSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-black">
        <AdminSidebar />
        <div className="ml-64">
          <DashboardHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
