
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: 'Campos Obrigatórios',
        description: 'Por favor, preencha email e senha.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await auth.signIn(formData.email, formData.password);
      
      if (result.success) {
        toast({
          title: 'Bem-vindo!',
          description: 'Login realizado com sucesso.',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Erro de Autenticação',
          description: result.error || 'Email ou senha inválidos.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro no Login',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: 'Campos Obrigatórios',
        description: 'Por favor, preencha email e senha.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await auth.signUp(formData.email, formData.password);
      
      if (result.success) {
        toast({
          title: 'Cadastro Realizado',
          description: result.error || 'Conta criada com sucesso.',
        });
      } else {
        toast({
          title: 'Erro no Cadastro',
          description: result.error || 'Não foi possível criar a conta.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro no Cadastro',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-glass-lg">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="p-6">
            <div className="space-y-2 text-center mb-6">
              <h3 className="text-xl font-semibold">Bem-vindo de volta</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Faça login na sua conta</p>
            </div>
            
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="p-6">
            <div className="space-y-2 text-center mb-6">
              <h3 className="text-xl font-semibold">Criar uma Conta</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Registre-se para começar</p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Senha</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Crie uma senha"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Criando Conta...' : 'Criar Conta'}
              </Button>
              
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                Ao se registrar, você aceita nossos
                <a href="#" className="text-primary hover:underline ml-1">
                  Termos de Serviço
                </a>
                <span> e </span>
                <a href="#" className="text-primary hover:underline">
                  Política de Privacidade
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
