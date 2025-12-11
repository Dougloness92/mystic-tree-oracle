import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Check, Trash2, Loader2, Mail } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('new');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedback(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast.error('Erro ao carregar mensagens');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const markAsReviewed = async (id: string) => {
    try {
      const { error } = await supabase
        .from('feedback')
        .update({ status: 'reviewed' })
        .eq('id', id);

      if (error) throw error;

      setFeedback(feedback.map(f => f.id === id ? { ...f, status: 'reviewed' } : f));
      toast.success('Marcado como revisado');
    } catch (error) {
      console.error('Error updating feedback:', error);
      toast.error('Erro ao atualizar');
    }
  };

  const deleteFeedback = async (id: string) => {
    try {
      const { error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFeedback(feedback.filter(f => f.id !== id));
      setSelectedFeedback(null);
      toast.success('Mensagem excluída');
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Erro ao excluir');
    }
  };

  const filteredFeedback = feedback.filter(f => f.status === activeTab);

  const openFeedback = (item: Feedback) => {
    setSelectedFeedback(item);
    if (item.status === 'new') {
      markAsReviewed(item.id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="font-display text-3xl text-primary">Mensagens</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="new" className="relative">
                Novas
                {feedback.filter(f => f.status === 'new').length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {feedback.filter(f => f.status === 'new').length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="reviewed">Revisadas</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4 mt-4">
              {filteredFeedback.length === 0 ? (
                <Card className="card-mystical">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      Nenhuma mensagem {activeTab === 'new' ? 'nova' : 'revisada'}.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredFeedback.map((item) => (
                  <Card 
                    key={item.id} 
                    className="card-mystical cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => openFeedback(item)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{item.name}</span>
                            <span className="text-sm text-muted-foreground">{item.email}</span>
                          </div>
                          <p className="text-sm line-clamp-2">{item.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(item.created_at).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          {item.status === 'new' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsReviewed(item.id)}
                              title="Marcar como revisado"
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
                                <AlertDialogTitle>Excluir mensagem?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteFeedback(item.id)}>
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* Feedback Detail Dialog */}
        <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Mensagem de {selectedFeedback?.name}</DialogTitle>
            </DialogHeader>
            {selectedFeedback && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedFeedback.email}`} className="text-primary hover:underline">
                    {selectedFeedback.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mensagem</p>
                  <p className="whitespace-pre-wrap">{selectedFeedback.message}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recebida em</p>
                  <p>{new Date(selectedFeedback.created_at).toLocaleString('pt-BR')}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button asChild variant="outline" className="flex-1">
                    <a href={`mailto:${selectedFeedback.email}`}>
                      Responder por Email
                    </a>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir mensagem?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteFeedback(selectedFeedback.id)}>
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
