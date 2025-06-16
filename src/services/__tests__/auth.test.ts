import { auth, User } from '../auth';
import { supabase } from '@/integrations/supabase/client';

// Mock do módulo supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

describe('Auth Service', () => {
  const mockUser: User = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
    role: 'requester',
    avatar: 'https://example.com/avatar.jpg',
  };

  const mockSession = {
    user: {
      id: 'user-123',
      email: 'test@example.com',
      user_metadata: {
        name: 'Test User',
      },
    },
  };

  // Limpar mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
    // Resetar o estado do auth
    auth['_resetState'] = () => {
      authState = {
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    };
    auth['_resetState']();
  });

  describe('signIn', () => {
    it('deve fazer login com sucesso', async () => {
      // Configurar o mock
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
        data: { user: mockSession.user },
        error: null,
      });

      // Chamar a função
      const result = await auth.signIn('test@example.com', 'password123');

      // Verificar o resultado
      expect(result).toEqual({ success: true });
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('deve retornar erro quando as credenciais forem inválidas', async () => {
      // Configurar o mock para retornar erro
      const error = new Error('Invalid login credentials');
      (supabase.auth.signInWithPassword as jest.Mock).mockRejectedValueOnce(error);

      // Chamar a função e verificar o erro
      const result = await auth.signIn('wrong@example.com', 'wrongpassword');

      // Verificar o resultado
      expect(result).toEqual({
        success: false,
        error: 'Invalid login credentials',
      });
    });
  });

  describe('signUp', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      // Configurar o mock
      (supabase.auth.signUp as jest.Mock).mockResolvedValueOnce({
        data: { user: mockSession.user },
        error: null,
      });

      // Chamar a função
      const result = await auth.signUp('new@example.com', 'password123');

      // Verificar o resultado
      expect(result).toEqual({
        success: true,
        error: 'Please check your email to confirm your account.',
      });
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123',
        options: {
          emailRedirectTo: 'http://localhost/',
        },
      });
    });
  });

  describe('signOut', () => {
    it('deve fazer logout com sucesso', async () => {
      // Configurar o mock
      (supabase.auth.signOut as jest.Mock).mockResolvedValueOnce({ error: null });

      // Chamar a função
      await auth.signOut();

      // Verificar se a função foi chamada
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('hasPermission', () => {
    it('deve retornar true para admin com qualquer permissão', () => {
      // Configurar usuário admin
      authState = {
        isAuthenticated: true,
        user: { ...mockUser, role: 'admin' },
        loading: false,
      };

      // Testar diferentes permissões
      expect(auth.hasPermission('any_permission')).toBe(true);
      expect(auth.hasPermission('another_permission')).toBe(true);
    });

    it('deve retornar true para approver com permissões de aprovação', () => {
      // Configurar usuário approver
      authState = {
        isAuthenticated: true,
        user: { ...mockUser, role: 'approver' },
        loading: false,
      };

      // Testar permissões
      expect(auth.hasPermission('approve')).toBe(true);
      expect(auth.hasPermission('request')).toBe(true);
      expect(auth.hasPermission('admin_only')).toBe(false);
    });

    it('deve retornar false para usuário não autenticado', () => {
      // Configurar usuário não autenticado
      authState = {
        isAuthenticated: false,
        user: null,
        loading: false,
      };

      // Testar permissão
      expect(auth.hasPermission('any_permission')).toBe(false);
    });
  });

  describe('useAuth', () => {
    it('deve retornar o estado atual de autenticação', () => {
      // Configurar estado de autenticação
      authState = {
        isAuthenticated: true,
        user: mockUser,
        loading: false,
      };

      // Chamar o hook (simulação)
      const result = auth.getAuthState();

      // Verificar o resultado
      expect(result).toEqual({
        isAuthenticated: true,
        user: mockUser,
        loading: false,
      });
    });
  });

  describe('getCurrentUser', () => {
    it('deve retornar o usuário atual quando autenticado', () => {
      // Configurar estado de autenticação
      authState = {
        isAuthenticated: true,
        user: mockUser,
        loading: false,
      };

      // Chamar a função
      const result = auth.getCurrentUser();

      // Verificar o resultado
      expect(result).toEqual(mockUser);
    });

    it('deve retornar null quando não autenticado', () => {
      // Configurar estado não autenticado
      authState = {
        isAuthenticated: false,
        user: null,
        loading: false,
      };

      // Chamar a função
      const result = auth.getCurrentUser();

      // Verificar o resultado
      expect(result).toBeNull();
    });
  });
});
