
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleBasedContent from '@/components/auth/RoleBasedContent';
import { 
  LayoutDashboard, 
  CheckSquare, 
  BarChart2, 
  Settings, 
  Shield, 
  FileText, 
  AlertTriangle,
  Cloud,
  Database,
  Bell,
  Users,
  Cog,
  Speech
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
}

const SidebarItem = ({ to, icon, text, isActive }: SidebarItemProps) => {
  return (
    <Link 
      to={to}
      className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const { profile } = useAuth();
  const [currentPath, setCurrentPath] = useState('');
  
  useEffect(() => {
    // Extract the main path segment
    const pathSegments = location.pathname.split('/');
    setCurrentPath(pathSegments[1] || 'dashboard');
  }, [location]);
  
  return (
    <aside className="w-64 hidden md:flex flex-col h-screen bg-white border-r border-gray-200 sticky top-0 pt-16">
      <div className="flex flex-col flex-1 overflow-y-auto py-6 px-3">
        {/* Core Navigation */}
        <div className="space-y-1">
          <SidebarItem 
            to="/dashboard" 
            icon={<LayoutDashboard size={18} />} 
            text="Dashboard" 
            isActive={currentPath === 'dashboard'}
          />
          
          <SidebarItem 
            to="/tasks" 
            icon={<CheckSquare size={18} />} 
            text="Tasks" 
            isActive={currentPath === 'tasks'}
          />
          
          <SidebarItem 
            to="/compliance" 
            icon={<Shield size={18} />} 
            text="Compliance" 
            isActive={currentPath === 'compliance'}
          />
          
          <SidebarItem 
            to="/policies" 
            icon={<FileText size={18} />} 
            text="Policies" 
            isActive={currentPath === 'policies'}
          />

          <SidebarItem 
            to="/voice-ai" 
            icon={<Speech size={18} />} 
            text="ComplyVoiceAI" 
            isActive={currentPath === 'voice-ai'}
          />
          
          <SidebarItem 
            to="/reports" 
            icon={<BarChart2 size={18} />} 
            text="Reports" 
            isActive={currentPath === 'reports'}
          />
        </div>
        
        {/* Risk Management */}
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Risk Management
          </h3>
          <div className="mt-2 space-y-1">
            <SidebarItem 
              to="/compliance/risks" 
              icon={<AlertTriangle size={18} />} 
              text="Risk Register" 
              isActive={location.pathname === '/compliance/risks'}
            />
            
            <SidebarItem 
              to="/cloud-security" 
              icon={<Cloud size={18} />} 
              text="Cloud Security" 
              isActive={currentPath === 'cloud-security'}
            />
          </div>
        </div>
        
        {/* Platform Management */}
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Platform
          </h3>
          <div className="mt-2 space-y-1">
            <SidebarItem 
              to="/data-sources" 
              icon={<Database size={18} />} 
              text="Data Sources" 
              isActive={currentPath === 'data-sources'}
            />
            
            <SidebarItem 
              to="/notifications" 
              icon={<Bell size={18} />} 
              text="Notifications" 
              isActive={currentPath === 'notifications'}
            />
            
            <SidebarItem 
              to="/team" 
              icon={<Users size={18} />} 
              text="Team" 
              isActive={currentPath === 'team'}
            />
            
            <SidebarItem 
              to="/settings" 
              icon={<Settings size={18} />} 
              text="Settings" 
              isActive={currentPath === 'settings'}
            />
          </div>
        </div>
        
        {/* Super Admin only section */}
        <RoleBasedContent allowedRoles={['super_admin']}>
          <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Administration
            </h3>
            <div className="mt-2 space-y-1">
              <SidebarItem 
                to="/admin/setup" 
                icon={<Cog size={18} />} 
                text="System Setup" 
                isActive={location.pathname === '/admin/setup'}
              />
            </div>
          </div>
        </RoleBasedContent>
      </div>
    </aside>
  );
};

export default Sidebar;
