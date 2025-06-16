import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User } from '@/types';

const userFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  role: z.enum(['admin', 'manager', 'authorizer', 'operator'], {
    required_error: 'Por favor, selecione um papel.',
  }),
  isActive: z.boolean().default(true),
  sendInvite: z.boolean().default(true),
  password: z
    .union([
      z.string().length(0), // Permite string vazia para edição (quando não alterar senha)
      z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }),
    ])
    .optional()
    .transform(e => (e === '' ? undefined : e)),
}).refine(
  (data) => {
    // Se for um novo usuário, senha é obrigatória
    if (!data.sendInvite && !data.password) {
      return false;
    }
    return true;
  },
  {
    message: 'Senha é obrigatória quando não enviar convite por email.',
    path: ['password'],
  }
);

type UserFormValues = z.infer<typeof userFormSchema>;

type UserFormProps = {
  user?: User;
  onSubmit: (data: UserFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
};

export const UserForm = ({ user, onSubmit, onCancel, isSubmitting }: UserFormProps) => {
  const { toast } = useToast();
  
  const defaultValues: Partial<UserFormValues> = {
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'operator',
    isActive: user ? user.isActive : true,
    sendInvite: true,
    password: '',
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const watchSendInvite = form.watch('sendInvite');

  const handleSubmit = async (data: UserFormValues) => {
    try {
      await onSubmit(data);
      toast({
        title: 'Sucesso',
        description: user ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o usuário. Por favor, tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{user ? 'Editar Usuário' : 'Novo Usuário'}</CardTitle>
        <CardDescription>
          {user
            ? 'Atualize as informações do usuário abaixo.'
            : 'Preencha as informações para criar um novo usuário.'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="joao@empresa.com" type="email" {...field} disabled={!!user} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Papel</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um papel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="manager">Gestor</SelectItem>
                        <SelectItem value="authorizer">Autorizador</SelectItem>
                        <SelectItem value="operator">Operador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {form.watch('role') === 'admin' && 'Acesso total ao sistema.'}
                      {form.watch('role') === 'manager' && 'Acesso gerencial e de aprovação.'}
                      {form.watch('role') === 'authorizer' && 'Pode aprovar/rejeitar solicitações.'}
                      {form.watch('role') === 'operator' && 'Acesso básico ao sistema.'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Usuário Ativo</FormLabel>
                      <FormDescription>
                        Usuários inativos não conseguem acessar o sistema.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {!user && (
                <FormField
                  control={form.control}
                  name="sendInvite"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Enviar convite por email</FormLabel>
                        <FormDescription>
                          O usuário receberá um email para definir sua senha.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              {(!watchSendInvite || user) && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {user ? 'Nova Senha' : 'Senha'}
                        {user && <span className="text-muted-foreground text-xs ml-2">(deixe em branco para manter a atual)</span>}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>
                        Mínimo 8 caracteres. Inclua letras, números e caracteres especiais.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
