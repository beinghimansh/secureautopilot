
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  CheckSquare, 
  Users, 
  Settings,
  FileText,
  Database,
  Bell,
  BarChart,
  Cloud
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link 
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 group",
        active ? 
          "bg-primary text-white" : 
          "text-gray-700 hover:bg-primary/10 hover:text-primary"
      )}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { profile } = useAuth();

  // Check if the current path starts with a specific route
  const isPathActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true;
    if (path === '/compliance' && (pathname === '/compliance' || pathname.includes('/compliance/'))) return true;
    if (path !== '/dashboard' && path !== '/compliance' && pathname === path) return true;
    return false;
  };

  // If we're on the root or auth page, don't show the sidebar
  if (pathname === '/' || pathname === '/auth' || pathname.includes('/auth')) {
    return null;
  }

  return (
    <aside className="hidden lg:flex h-screen sticky top-0 w-64 flex-col border-r bg-white px-3 py-4">
      <div className="mb-6 flex items-center px-2">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-2">
          <Shield size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">ComplyFlow</h1>
          <p className="text-xs text-gray-500">Compliance made simple</p>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="px-3 py-2">
          <h3 className="text-xs font-medium uppercase text-gray-500">GENERAL</h3>
        </div>
        <SidebarItem 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard" 
          href="/dashboard" 
          active={isPathActive('/dashboard')} 
        />
        <SidebarItem 
          icon={<Shield size={18} />} 
          label="Compliance" 
          href="/compliance" 
          active={isPathActive('/compliance')} 
        />
        <SidebarItem 
          icon={<CheckSquare size={18} />} 
          label="Tasks" 
          href="/tasks" 
          active={isPathActive('/tasks')} 
        />
        <SidebarItem 
          icon={<FileText size={18} />} 
          label="Policies" 
          href="/policies" 
          active={isPathActive('/policies')} 
        />
        <SidebarItem 
          icon={<BarChart size={18} />} 
          label="Reports" 
          href="/reports" 
          active={isPathActive('/reports')} 
        />
      </div>
      
      <div className="mt-6 space-y-1">
        <div className="px-3 py-2">
          <h3 className="text-xs font-medium uppercase text-gray-500">INTEGRATIONS</h3>
        </div>
        <SidebarItem 
          icon={<Database size={18} />} 
          label="Data Sources" 
          href="/data-sources" 
          active={isPathActive('/data-sources')} 
        />
        <SidebarItem 
          icon={<Cloud size={18} />} 
          label="Cloud Security" 
          href="/cloud-security" 
          active={isPathActive('/cloud-security')} 
        />
        <SidebarItem 
          icon={<Bell size={18} />} 
          label="Notifications" 
          href="/notifications" 
          active={isPathActive('/notifications')} 
        />
      </div>
      
      <div className="mt-6 space-y-1">
        <div className="px-3 py-2">
          <h3 className="text-xs font-medium uppercase text-gray-500">SETTINGS</h3>
        </div>
        <SidebarItem 
          icon={<Users size={18} />} 
          label="Team" 
          href="/team" 
          active={isPathActive('/team')} 
        />
        <SidebarItem 
          icon={<Settings size={18} />} 
          label="Settings" 
          href="/settings" 
          active={isPathActive('/settings')} 
        />
      </div>
      
      <div className="mt-auto px-3 py-2">
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Acme Inc.</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
            <Link 
              to="/settings"
              className="rounded-full p-1.5 bg-white hover:bg-gray-100 transition-colors"
            >
              <Settings size={16} className="text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
