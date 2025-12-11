import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FileText, MessageSquare, Mail, Heart } from 'lucide-react';

interface DashboardStats {
  totalPosts: number;
  pendingComments: number;
  newFeedback: number;
  totalLikes: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    pendingComments: 0,
    newFeedback: 0,
    totalLikes: 0,
  });
  const [recentFeedback, setRecentFeedback] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total posts
        const { count: postsCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true });

        // Fetch pending comments
        const { count: pendingCount } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // Fetch new feedback
        const { count: feedbackCount } = await supabase
          .from('feedback')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');

        // Fetch total likes
        const { count: likesCount } = await supabase
          .from('likes')
          .select('*', { count: 'exact', head: true });

        // Fetch recent feedback
        const { data: feedbackData } = await supabase
          .from('feedback')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          totalPosts: postsCount || 0,
          pendingComments: pendingCount || 0,
          newFeedback: feedbackCount || 0,
          totalLikes: likesCount || 0,
        });

        setRecentFeedback(feedbackData || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total de Posts', value: stats.totalPosts, icon: FileText, color: 'text-primary' },
    { title: 'Comentários Pendentes', value: stats.pendingComments, icon: MessageSquare, color: 'text-secondary' },
    { title: 'Novas Mensagens', value: stats.newFeedback, icon: Mail, color: 'text-accent' },
    { title: 'Total de Curtidas', value: stats.totalLikes, icon: Heart, color: 'text-destructive' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="font-display text-3xl text-primary">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <Card key={index} className="card-mystical">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-display font-bold">
                  {isLoading ? '...' : stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Feedback */}
        <Card className="card-mystical">
          <CardHeader>
            <CardTitle className="font-display text-xl">Mensagens Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Carregando...</p>
            ) : recentFeedback.length === 0 ? (
              <p className="text-muted-foreground">Nenhuma mensagem ainda.</p>
            ) : (
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{feedback.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(feedback.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.email}</p>
                    <p className="text-sm mt-2 line-clamp-2">{feedback.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
