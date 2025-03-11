
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Package, 
  BarChart3, 
  Boxes, 
  ShoppingCart, 
  Warehouse, 
  Tool, 
  CalendarClock, 
  Users, 
  Settings, 
  LifeBuoy,
  Layers,
  ClipboardList
} from 'lucide-react';
import { auth } from '@/services/auth';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  permission?: string;
  subItems?: NavItem[];
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [user, setUser] = useState(auth.getCurrentUser());
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  
  // Subscribe to auth changes
  useEffect(() => {
    return auth.subscribe((state) => {
      setUser(state.user);
    });
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile, setIsOpen]);

  // Navigation items
  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: BarChart3,
      path: '/dashboard',
    },
    {
      label: 'Materials',
      icon: Package,
      path: '/materials',
      permission: 'request',
    },
    {
      label: 'Inventory',
      icon: Boxes,
      path: '/inventory',
      permission: 'request',
    },
    {
      label: 'Purchasing',
      icon: ShoppingCart,
      path: '/purchasing',
      permission: 'request',
    },
    {
      label: 'Warehousing',
      icon: Warehouse,
      path: '/warehousing',
      permission: 'request',
    },
    {
      label: 'Operations',
      icon: Tool,
      path: '/operations',
      permission: 'request',
    },
    {
      label: 'Planning',
      icon: CalendarClock,
      path: '/planning',
      permission: 'request',
    },
    {
      label: 'Tasks',
      icon: ClipboardList,
      path: '/tasks',
      permission: 'request',
    },
    {
      label: 'Administration',
      icon: Layers,
      path: '/admin',
      permission: 'admin',
      subItems: [
        {
          label: 'Users',
          icon: Users,
          path: '/admin/users',
          permission: 'admin',
        },
        {
          label: 'Settings',
          icon: Settings,
          path: '/admin/settings',
          permission: 'admin',
        },
      ],
    },
  ];

  // Toggle submenu
  const toggleSubmenu = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if user has permission to see menu item
  const hasPermission = (item: NavItem) => {
    if (!item.permission) return true;
    return auth.hasPermission(item.permission);
  };

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col w-64 h-screen pt-16 pb-4 transition-transform duration-300 ease-in-out bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
      )}
    >
      <div className="overflow-y-auto h-full px-4 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            hasPermission(item) && (
              <div key={item.path}>
                {item.subItems ? (
                  <div className="space-y-1">
                    <button
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                        expandedItems[item.path] && "bg-gray-100 dark:bg-gray-800"
                      )}
                      onClick={() => toggleSubmenu(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className={cn("text-sm font-medium transition-opacity duration-200", !isOpen && "md:opacity-0")}>
                        {item.label}
                      </span>
                    </button>
                    
                    {expandedItems[item.path] && (
                      <div className="pl-10 space-y-1">
                        {item.subItems.map((subItem) => (
                          hasPermission(subItem) && (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                                isActive && "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                              )}
                            >
                              <subItem.icon className="h-4 w-4" />
                              <span className={cn("transition-opacity duration-200", !isOpen && "md:opacity-0")}>
                                {subItem.label}
                              </span>
                            </NavLink>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                      isActive && "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                    )}
                  >
                    <item.icon className="flex-shrink-0 h-5 w-5" />
                    <span className={cn("text-sm font-medium transition-opacity duration-200", !isOpen && "md:opacity-0")}>
                      {item.label}
                    </span>
                  </NavLink>
                )}
              </div>
            )
          ))}
        </nav>
        
        {/* Help Section at bottom */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
          <NavLink
            to="/help"
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LifeBuoy className="h-5 w-5" />
            <span className={cn("text-sm font-medium transition-opacity duration-200", !isOpen && "md:opacity-0")}>
              Help & Support
            </span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
