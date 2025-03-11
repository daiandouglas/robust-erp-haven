
// This is a placeholder authentication service
// In a real implementation, this would connect to Supabase Auth

type User = {
  id: string;
  email: string;
  name: string;
  role: 'requester' | 'approver' | 'admin';
  avatar?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
};

// Mock data for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  },
  {
    id: '2',
    email: 'approver@example.com',
    name: 'Approver User',
    role: 'approver',
    avatar: 'https://ui-avatars.com/api/?name=Approver+User&background=7988EC&color=fff',
  },
  {
    id: '3',
    email: 'requester@example.com',
    name: 'Requester User',
    role: 'requester',
    avatar: 'https://ui-avatars.com/api/?name=Requester+User&background=13CE66&color=fff',
  },
];

// Initial state
let authState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

// Event listeners
const listeners = new Set<(state: AuthState) => void>();

// Function to update state and notify listeners
const updateState = (newState: Partial<AuthState>) => {
  authState = { ...authState, ...newState };
  listeners.forEach((listener) => listener(authState));
};

export const auth = {
  // Subscribe to auth state changes
  subscribe: (callback: (state: AuthState) => void) => {
    listeners.add(callback);
    callback(authState);

    return () => {
      listeners.delete(callback);
    };
  },

  // Get current user
  getCurrentUser: () => authState.user,

  // Get auth state
  getAuthState: () => authState,

  // Sign in
  signIn: async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      updateState({ loading: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user by email (in a real app, this would be a server authentication)
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (user && password === 'password') { // In a real app, proper password validation would happen
        updateState({ isAuthenticated: true, user, loading: false });
        return { success: true };
      }
      
      updateState({ loading: false });
      return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      updateState({ loading: false });
      return { success: false, error: 'An error occurred during sign in' };
    }
  },

  // Sign out
  signOut: async (): Promise<void> => {
    try {
      updateState({ loading: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      updateState({ isAuthenticated: false, user: null, loading: false });
    } catch (error) {
      updateState({ loading: false });
      throw error;
    }
  },

  // Check if user has permission
  hasPermission: (permission: string): boolean => {
    if (!authState.isAuthenticated || !authState.user) {
      return false;
    }

    // Simple role-based permission check
    const role = authState.user.role;
    
    // Admin has all permissions
    if (role === 'admin') {
      return true;
    }
    
    // Approver has approver and requester permissions
    if (role === 'approver' && ['approve', 'request'].includes(permission)) {
      return true;
    }
    
    // Requester has only requester permissions
    if (role === 'requester' && permission === 'request') {
      return true;
    }
    
    return false;
  },
};

// Hook for components
export const useAuth = () => {
  const [state, setState] = React.useState<AuthState>(authState);
  
  React.useEffect(() => {
    return auth.subscribe(setState);
  }, []);
  
  return state;
};
