import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  FileText, 
  BarChart3, 
  LogIn, 
  Menu,
  Award,
  User
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'report', label: 'Report Issue', icon: FileText },
    { id: 'track', label: 'Track Issues', icon: BarChart3 },
    { id: 'community', label: 'Community', icon: Award },
    { id: 'user-dashboard', label: 'Dashboard', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <div className="h-6 w-6 rounded bg-white"></div>
            </div>
            <div>
              <h1 className="font-bold text-primary">CivicConnect</h1>
              <p className="text-xs text-muted-foreground">Smart India Hackathon 2025</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="hidden sm:flex">
              <Award className="h-3 w-3 mr-1" />
              125 Points
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('login')}
              className="hidden sm:flex"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-colors ${
                      currentPage === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-3 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onNavigate('login')}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="mb-3">CivicConnect</h3>
              <p className="text-sm text-muted-foreground">
                Empowering citizens to create cleaner, safer communities through collaborative civic engagement.
              </p>
            </div>
            <div>
              <h4 className="mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate('report')} className="hover:text-primary">Report Issue</button></li>
                <li><button onClick={() => onNavigate('track')} className="hover:text-primary">Track Progress</button></li>
                <li><button onClick={() => onNavigate('community')} className="hover:text-primary">Community Hub</button></li>
                <li><button onClick={() => onNavigate('user-dashboard')} className="hover:text-primary">User Dashboard</button></li>
                <li><button onClick={() => onNavigate('dashboard')} className="hover:text-primary">Authority Dashboard</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3">Contact</h4>
              <p className="text-sm text-muted-foreground">
                Smart India Hackathon 2025<br />
                Building tomorrow's civic solutions
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            © 2025 CivicConnect. Built for Smart India Hackathon.
          </div>
        </div>
      </footer>
    </div>
  );
}