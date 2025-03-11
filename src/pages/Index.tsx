
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/services/auth';
import Layout from '@/components/layout/Layout';
import AuthForm from '@/components/auth/AuthForm';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    const unsubscribe = auth.subscribe((state) => {
      if (state.isAuthenticated) {
        navigate('/dashboard');
      }
    });
    
    return unsubscribe;
  }, [navigate]);

  return (
    <Layout requireAuth={false}>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Enterprise Resource Planning
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Robust ERP <span className="text-primary">Solution</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto md:mx-0">
              A comprehensive system for materials, inventory, purchasing, warehousing, operations and maintenance.
            </p>
            
            <ul className="text-left mb-8 space-y-2 max-w-md mx-auto md:mx-0">
              {[
                'Intuitive inventory management',
                'Purchase order workflow automation',
                'Real-time warehouse visualization',
                'Comprehensive maintenance planning',
                'Advanced analytics and reporting'
              ].map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 md:mt-0">
            <AuthForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
