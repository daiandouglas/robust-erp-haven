
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, MessageSquare, Settings, User, Menu, X } from 'lucide-react';
import { auth } from '@/services/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(auth.getCurrentUser());

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subscribe to auth changes
  useEffect(() => {
    return auth.subscribe((state) => {
      setUser(state.user);
    });
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast({
        title: 'Signed out successfully',
        description: 'You have been logged out of your account.',
      });
    } catch (error) {
      toast({
        title: 'Error signing out',
        description: 'There was a problem signing you out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Home';
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/materials') return 'Materials';
    if (path === '/inventory') return 'Inventory';
    if (path === '/purchasing') return 'Purchasing';
    if (path === '/warehousing') return 'Warehousing';
    if (path === '/maintenance') return 'Operations & Maintenance';
    
    return path.split('/').pop()?.replace('-', ' ');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-glass shadow-subtle' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left: Menu toggle & Logo */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          <div className="flex items-center">
            <Link 
              to="/dashboard"
              className="flex items-center gap-2 font-semibold text-xl text-primary transition-opacity duration-200 hover:opacity-80"
            >
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">
                ERP
              </div>
              <span className="hidden md:inline">Robust ERP</span>
            </Link>
          </div>
        </div>

        {/* Center: Page title */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg font-medium">{getPageTitle()}</h1>
        </div>

        {/* Right: User menu & notifications */}
        <div className="flex items-center gap-1 md:gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
                <MessageSquare size={20} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground mt-1 capitalize">
                        Role: {user.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link to="/">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
