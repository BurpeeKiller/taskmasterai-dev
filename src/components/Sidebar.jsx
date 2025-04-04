import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  CheckSquare, 
  Calendar, 
  Users, 
  Globe, 
  Clock, 
  Bot, 
  Settings,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Inbox, label: 'Inbox', path: '/inbox' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Users, label: 'Friends', path: '/friends' },
    { icon: Globe, label: 'Community', path: '/community' },
    { icon: Clock, label: 'Focus Mode', path: '/focus-mode' },
    { icon: Bot, label: 'AI Assistant', path: '/ai-assistant' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  return (
    <aside className="bg-[#0f172a] text-gray-300 w-64 h-screen flex flex-col fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="p-6 border-b border-[#1e293b]">
        <h1 className="text-xl font-bold text-white flex items-center">
          <span className="text-indigo-500 mr-2">🚀</span>
          TaskMaster<span className="text-indigo-500">AI</span>
        </h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-indigo-600 text-white' 
                      : 'hover:bg-[#1e293b] text-gray-300'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
                  <span className="ml-3">{item.label}</span>
                  {item.label === 'Tasks' && (
                    <span className="ml-auto bg-indigo-700 text-xs px-1.5 py-0.5 rounded-full">
                      5
                    </span>
                  )}
                  {item.label === 'Inbox' && (
                    <span className="ml-auto bg-red-600 text-xs px-1.5 py-0.5 rounded-full">
                      3
                    </span>
                  )}
                  {(item.label === 'Friends' || item.label === 'Community') && (
                    <ChevronRight size={16} className="ml-auto text-gray-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Pied de la barre latérale */}
      <div className="mt-auto pt-4">
        <Link
          to="/settings"
          className={`flex items-center px-3 py-2 rounded-md transition-colors duration-150 ${
            location.pathname === '/settings' 
              ? 'bg-[#1e293b] text-white' 
              : 'text-gray-400 hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
        
        {/* Bouton Premium */}
        <div className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-3 text-white">
          <div className="font-medium mb-1">Upgrade to Premium</div>
          <p className="text-xs text-white/80">Unlock all features and get more done!</p>
        </div>
        
        {/* Profil utilisateur */}
        <div className="mt-4 flex items-center gap-2 text-gray-400 px-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
            g
          </div>
          <span>giraud greg</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
