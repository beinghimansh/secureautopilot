
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  CheckSquare, 
  Users, 
  Settings,
  FileText,
  BarChart,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ icon, label, href, active, collapsed }: SidebarItemProps) => {
  return (
    <Link 
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 group",
        active ? 
          "bg-blue-600 text-white" : 
          "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
      )}
      title={collapsed ? label : undefined}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      {!collapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { profile } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Check if the current path starts with a specific route
  const isPathActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true;
    if (path === '/compliance' && (pathname === '/compliance' || pathname.includes('/compliance/'))) return true;
    if (path !== '/dashboard' && path !== '/compliance' && pathname === path) return true;
    return false;
  };

  // Toggle sidebar collapse state
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // If we're on the root or auth page, don't show the sidebar
  if (pathname === '/' || pathname === '/auth' || pathname.includes('/auth')) {
    return null;
  }

  return (
    <motion.aside 
      className={`hidden lg:flex h-screen sticky top-0 flex-col border-r bg-white px-3 py-4 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`mb-6 flex items-center px-2 ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed ? (
          <>
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-2">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ComplyFlow</h1>
              <p className="text-xs text-gray-500">Compliance made simple</p>
            </div>
          </>
        ) : (
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
            <Shield size={24} className="text-white" />
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        {!collapsed && (
          <div className="px-3 py-2">
            <h3 className="text-xs font-medium uppercase text-gray-500">GENERAL</h3>
          </div>
        )}
        <SidebarItem 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard" 
          href="/dashboard" 
          active={isPathActive('/dashboard')} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Shield size={18} />} 
          label="Compliance" 
          href="/compliance" 
          active={isPathActive('/compliance')} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<CheckSquare size={18} />} 
          label="Tasks" 
          href="/tasks" 
          active={isPathActive('/tasks')} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<FileText size={18} />} 
          label="Policies" 
          href="/policies" 
          active={isPathActive('/policies')} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<BarChart size={18} />} 
          label="Reports" 
          href="/reports" 
          active={isPathActive('/reports')} 
          collapsed={collapsed}
        />
      </div>
      
      <div className="mt-auto">
        <button
          onClick={toggleCollapse}
          className="flex items-center justify-center w-full p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
