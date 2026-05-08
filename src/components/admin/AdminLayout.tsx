import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useBrandConfig } from '@/context/BrandConfigContext';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, BookOpen, GraduationCap, Book, ShoppingBag, Settings, FileText, Images, Palette, Users, ClipboardList } from 'lucide-react';
import { useEffect } from 'react';

const AdminLayout = () => {
  const { isAuthenticated, logout, username } = useAuth();
  const { brandConfig } = useBrandConfig();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/blogs', label: 'Blogs', icon: BookOpen },
    { path: '/admin/courses', label: 'Courses', icon: GraduationCap },
    { path: '/admin/workshop-waitlist', label: 'Workshop Waitlist', icon: Users },
    { path: '/admin/applications', label: 'Applications', icon: ClipboardList },
    { path: '/admin/journals', label: 'Journals', icon: Book },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/admin/site-content', label: 'Site Content', icon: FileText },
    { path: '/admin/images', label: 'Images', icon: Images },
    { path: '/admin/branding', label: 'Branding & Theme', icon: Palette },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-background shadow-lg z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-primary">{brandConfig.siteName} Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome, {username}</p>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

