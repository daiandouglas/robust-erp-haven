
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/services/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle sign in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both email and password.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await auth.signIn(formData.email, formData.password);
      
      if (result.success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Authentication Failed',
          description: result.error || 'Invalid email or password.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Sign In Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Registration Information',
      description: 'In this demo, please use the provided test accounts. Registration is not available.',
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-glass-lg">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="p-6">
            <div className="space-y-2 text-center mb-6">
              <h3 className="text-xl font-semibold">Welcome Back</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to access your account</p>
            </div>
            
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              
              <div className="text-center text-sm mt-6">
                <p className="text-gray-500 dark:text-gray-400">
                  Test accounts (password: "password"):
                </p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-xs p-1 bg-gray-100 dark:bg-gray-700 rounded">
                    admin@example.com
                  </div>
                  <div className="text-xs p-1 bg-gray-100 dark:bg-gray-700 rounded">
                    approver@example.com
                  </div>
                  <div className="text-xs p-1 bg-gray-100 dark:bg-gray-700 rounded">
                    requester@example.com
                  </div>
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="p-6">
            <div className="space-y-2 text-center mb-6">
              <h3 className="text-xl font-semibold">Create an Account</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Register to start using our platform</p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="name@example.com"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  disabled={isLoading}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
              
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                By registering, you accept our
                <a href="#" className="text-primary hover:underline ml-1">
                  Terms of Service
                </a>
                <span> and </span>
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthForm;
