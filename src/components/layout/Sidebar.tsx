
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Shield, LayoutDashboard, CheckSquare, FileText, BarChart3, Settings, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label, isActive = false, isCollapsed = false }) => {
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center py-2 px-3 my-1 rounded-md transition-colors",
        isActive 
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
      )}
    >
      <Icon className={cn(
        "flex-shrink-0",
        isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"
      )} size={20} />
      
      {!isCollapsed && (
        <span className="ml-3 text-sm font-medium">{label}</span>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Hide sidebar on landing page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <aside
      className={cn(
        "h-screen border-r border-gray-200 bg-white transition-all duration-300 flex flex-col",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="px-4 py-5 border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
            <Shield size={20} className="text-white" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-800">ComplyAI</span>
                <span className="text-xs text-gray-500">Compliance made simple</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex-1 py-4 px-3 overflow-y-auto">
        <div className="mb-2">
          <p className="px-3 mb-1 text-xs font-medium text-gray-400 uppercase">
            {!isCollapsed && "General"}
          </p>
          <SidebarLink
            to="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            isActive={location.pathname === '/dashboard'}
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/compliance"
            icon={Shield}
            label="Compliance"
            isActive={location.pathname === '/compliance' || location.pathname.includes('/compliance/')}
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/tasks"
            icon={CheckSquare}
            label="Tasks"
            isActive={location.pathname === '/tasks' || location.pathname.includes('/tasks/')}
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/policies"
            icon={FileText}
            label="Policies"
            isActive={location.pathname === '/policies'}
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/reports"
            icon={BarChart3}
            label="Reports"
            isActive={location.pathname === '/reports' || location.pathname.includes('/reports/')}
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/settings"
            icon={Settings}
            label="Settings"
            isActive={location.pathname === '/settings'}
            isCollapsed={isCollapsed}
          />
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={toggleSidebar}
          className="w-full p-2 flex justify-center items-center rounded-md hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight size={18} className="text-gray-500" />
          ) : (
            <ChevronLeft size={18} className="text-gray-500" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
