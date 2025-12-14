import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SiteSettings {
  contact_email: string;
  contact_whatsapp: string;
  contact_instagram: string;
  about_subtitle: string;
  about_main_text: string;
  about_how_i_work: string;
  about_approach: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    contact_email: '',
    contact_whatsapp: '',
    contact_instagram: '',
    about_subtitle: '',
    about_main_text: '',
    about_how_i_work: '',
    about_approach: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (error) {
      toast.error('Erro ao carregar configurações');
      console.error(error);
    } else if (data) {
      const settingsMap = data.reduce((acc, item) => {
        acc[item.key as keyof SiteSettings] = item.value;
        return acc;
      }, {} as SiteSettings);
      
      setSettings({
        contact_email: settingsMap.contact_email || '',
        contact_whatsapp: settingsMap.contact_whatsapp || '',
        contact_instagram: settingsMap.contact_instagram || '',
        about_subtitle: settingsMap.about_subtitle || '',
        about_main_text: settingsMap.about_main_text || '',
        about_how_i_work: settingsMap.about_how_i_work || '',
        about_approach: settingsMap.about_approach || '',
      });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);

    const updates = [
      { key: 'contact_email', value: settings.contact_email },
      { key: 'contact_whatsapp', value: settings.contact_whatsapp },
      { key: 'contact_instagram', value: settings.contact_instagram },
      { key: 'about_subtitle', value: settings.about_subtitle },
      { key: 'about_main_text', value: settings.about_main_text },
      { key: 'about_how_i_work', value: settings.about_how_i_work },
      { key: 'about_approach', value: settings.about_approach },
    ];

    try {
      for (const update of updates) {
        const { data: existing } = await supabase
          .from('site_settings')
          .select('id')
          .eq('key', update.key)
          .single();

        if (existing) {
          const { error } = await supabase
            .from('site_settings')
            .update({ value: update.value })
            .eq('key', update.key);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('site_settings')
            .insert({ key: update.key, value: update.value });
          if (error) throw error;
        }
      }
      
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configurações');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Configurações do Site
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as informações de contato exibidas no site
          </p>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="about">Página Sobre</TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>
                  Estas informações serão exibidas no cabeçalho, rodapé e página de contato
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={settings.contact_email}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="+55 11 99999-9999"
                    value={settings.contact_whatsapp}
                    onChange={(e) => setSettings({ ...settings, contact_whatsapp: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Inclua o código do país (ex: +55 para Brasil)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="@seuusuario"
                    value={settings.contact_instagram}
                    onChange={(e) => setSettings({ ...settings, contact_instagram: e.target.value })}
                  />
                </div>

                <Button onClick={handleSave} disabled={isSaving} className="mt-4">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Configurações
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Página Sobre</CardTitle>
                <CardDescription>
                  Edite o conteúdo da página "Sobre Mim". Campos vazios não serão exibidos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="about_subtitle">Subtítulo (opcional)</Label>
                  <Input
                    id="about_subtitle"
                    placeholder="Uma breve frase sobre você..."
                    value={settings.about_subtitle}
                    onChange={(e) => setSettings({ ...settings, about_subtitle: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Aparece abaixo do título "Sobre Mim"
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_main_text">Texto Principal</Label>
                  <Textarea
                    id="about_main_text"
                    placeholder="Conte sua história, jornada e o que te motiva..."
                    value={settings.about_main_text}
                    onChange={(e) => setSettings({ ...settings, about_main_text: e.target.value })}
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_how_i_work">Como Trabalho (opcional)</Label>
                  <Textarea
                    id="about_how_i_work"
                    placeholder="Descreva seu processo, metodologia e abordagem prática..."
                    value={settings.about_how_i_work}
                    onChange={(e) => setSettings({ ...settings, about_how_i_work: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_approach">Abordagem (opcional)</Label>
                  <Textarea
                    id="about_approach"
                    placeholder="Descreva sua filosofia, valores e compromisso ético..."
                    value={settings.about_approach}
                    onChange={(e) => setSettings({ ...settings, about_approach: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button onClick={handleSave} disabled={isSaving} className="mt-4">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Configurações
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
