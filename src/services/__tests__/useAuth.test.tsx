import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth, auth } from '../auth';

// Mock do módulo auth
jest.mock('../auth', () => {
  const originalModule = jest.requireActual('../auth');
  return {
    ...originalModule,
    auth: {
      ...originalModule.auth,
      subscribe: jest.fn((callback) => {
        // Simular uma inscrição inicial
        callback(originalModule.auth.getAuthState());
        return () => {}; // Retorna função de limpeza
      }),
    },
  };
});

describe('useAuth', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
    role: 'requester' as const,
  };

  beforeEach(() => {
    // Resetar mocks antes de cada teste
    jest.clearAllMocks();
    // Resetar o estado do auth
    auth._resetState();
  });

  it('deve retornar o estado inicial de autenticação', () => {
    // Configurar o estado inicial
    auth['_setAuthState']({
      isAuthenticated: false,
      user: null,
      loading: false,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current).toEqual({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  });

  it('deve atualizar o estado quando o usuário fizer login', () => {
    // Configurar o estado inicial
    auth['_setAuthState']({
      isAuthenticated: false,
      user: null,
      loading: true,
    });

    const { result, rerender } = renderHook(() => useAuth());

    // Simular atualização de estado após login
    act(() => {
      auth['_setAuthState']({
        isAuthenticated: true,
        user: mockUser,
        loading: false,
      });
    });

    // Forçar nova renderização
    rerender();

    expect(result.current).toEqual({
      isAuthenticated: true,
      user: mockUser,
      loading: false,
    });
  });

  it('deve limpar a inscrição quando o componente for desmontado', () => {
    const unsubscribe = jest.fn();
    (auth.subscribe as jest.Mock).mockReturnValueOnce(unsubscribe);

    const { unmount } = renderHook(() => useAuth());
    
    // Desmontar o componente
    unmount();
    
    // Verificar se a função de limpeza foi chamada
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com erros durante a atualização de estado', () => {
    // Configurar o mock para lançar um erro
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Forçar um erro no callback de atualização
    const error = new Error('Erro de teste');
    (auth.subscribe as jest.Mock).mockImplementationOnce((callback) => {
      try {
        callback({}); // Objeto inválido para forçar erro
      } catch (e) {
        console.error('Erro no teste:', e);
      }
      return () => {};
    });

    // Renderizar o hook
    const { result } = renderHook(() => useAuth());

    // Verificar se o erro foi registrado
    expect(consoleError).toHaveBeenCalledWith(
      'Erro no teste:',
      expect.any(Error)
    );

    // Restaurar console.error
    consoleError.mockRestore();
  });
});
