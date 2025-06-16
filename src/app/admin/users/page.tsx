'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { UserList } from '@/components/auth/UserList';
import { UserForm } from '@/components/auth/UserForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { User } from '@/types';
import { auth } from '@/services/auth';

// Mock data - substituir por chamadas à API real
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@empresa.com',
    role: 'admin',
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Gerente',
    email: 'gerente@empresa.com',
    role: 'manager',
    isActive: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '3',
    name: 'Autorizador',
    email: 'autorizador@empresa.com',
    role: 'authorizer',
    isActive: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: '4',
    name: 'Operador',
    email: 'operador@empresa.com',
    role: 'operator',
    isActive: true,
    lastLogin: null,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Carregar usuários
  useEffect(() => {
    const loadUsers = async () => {
      try {
        // TODO: Substituir por chamada à API real
        // const response = await fetch('/api/users');
        // const data = await response.json();
        setUsers(mockUsers);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar a lista de usuários.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [toast]);

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      // TODO: Substituir por chamada à API real
      // await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: 'Sucesso',
        description: 'Usuário excluído com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o usuário.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (currentUser) {
        // Atualizar usuário existente
        // TODO: Substituir por chamada à API real
        // await fetch(`/api/users/${currentUser.id}`, {
        //   method: 'PUT',
        //   body: JSON.stringify(data),
        // });
        
        const updatedUsers = users.map(user => 
          user.id === currentUser.id ? { ...user, ...data } : user
        );
        setUsers(updatedUsers);
      } else {
        // Criar novo usuário
        // TODO: Substituir por chamada à API real
        // const response = await fetch('/api/users', {
        //   method: 'POST',
        //   body: JSON.stringify(data),
        // });
        // const newUser = await response.json();
        
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          lastLogin: null,
        };
        
        setUsers([...users, newUser]);
      }
      
      // Fechar o formulário e limpar o usuário atual
      setIsFormOpen(false);
      setCurrentUser(null);
      
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw error; // Será tratado pelo UserForm
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setCurrentUser(null);
  };

  // Verificar permissões
  const currentUserRole = auth.getCurrentUser()?.role;
  const canManageUsers = currentUserRole === 'admin';

  if (!canManageUsers) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold">Acesso Negado</h1>
          <p className="text-muted-foreground">
            Você não tem permissão para acessar esta página. Por favor, entre em contato com o administrador do sistema.
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Voltar para o Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários e permissões do sistema
          </p>
        </div>
        <Button onClick={() => {
          setCurrentUser(null);
          setIsFormOpen(true);
        }}>
          Novo Usuário
        </Button>
      </div>

      <UserList 
        users={users} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onInvite={() => {
          setCurrentUser(null);
          setIsFormOpen(true);
        }}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <UserForm 
            user={currentUser || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
