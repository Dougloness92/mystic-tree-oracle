import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Check, X, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Comment {
  id: string;
  post_id: string;
  name: string;
  email: string | null;
  content: string;
  status: string;
  created_at: string;
  posts?: {
    title: string;
  };
}

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          posts:post_id (title)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Erro ao carregar comentários');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const updateStatus = async (id: string, status: 'approved' | 'spam') => {
    try {
      const { error } = await supabase
        .from('comments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setComments(comments.map(c => c.id === id ? { ...c, status } : c));
      toast.success(status === 'approved' ? 'Comentário aprovado!' : 'Marcado como spam');
    } catch (error) {
      console.error('Error updating comment:', error);
      toast.error('Erro ao atualizar comentário');
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setComments(comments.filter(c => c.id !== id));
      toast.success('Comentário excluído');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Erro ao excluir comentário');
    }
  };

  const filteredComments = comments.filter(c => c.status === activeTab);

  const renderCommentCard = (comment: Comment) => (
    <Card key={comment.id} className="card-mystical">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">{comment.name}</span>
              {comment.email && (
                <span className="text-sm text-muted-foreground">({comment.email})</span>
              )}
            </div>
            <p className="text-sm mb-2">{comment.content}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Post: {comment.posts?.title || 'Desconhecido'}</span>
              <span>•</span>
              <span>{new Date(comment.created_at).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {comment.status === 'pending' && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateStatus(comment.id, 'approved')}
                  title="Aprovar"
                >
                  <Check className="h-4 w-4 text-accent" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateStatus(comment.id, 'spam')}
                  title="Marcar como spam"
                >
                  <AlertTriangle className="h-4 w-4 text-secondary" />
                </Button>
              </>
            )}
            {comment.status === 'approved' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateStatus(comment.id, 'spam')}
                title="Marcar como spam"
              >
                <AlertTriangle className="h-4 w-4 text-secondary" />
              </Button>
            )}
            {comment.status === 'spam' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateStatus(comment.id, 'approved')}
                title="Aprovar"
              >
                <Check className="h-4 w-4 text-accent" />
              </Button>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir comentário?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteComment(comment.id)}>
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="font-display text-3xl text-primary">Comentários</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="pending" className="relative">
                Pendentes
                {comments.filter(c => c.status === 'pending').length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {comments.filter(c => c.status === 'pending').length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">Aprovados</TabsTrigger>
              <TabsTrigger value="spam">Spam</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4 mt-4">
              {filteredComments.length === 0 ? (
                <Card className="card-mystical">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Nenhum comentário {activeTab === 'pending' ? 'pendente' : activeTab === 'approved' ? 'aprovado' : 'marcado como spam'}.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredComments.map(renderCommentCard)
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AdminLayout>
  );
}
