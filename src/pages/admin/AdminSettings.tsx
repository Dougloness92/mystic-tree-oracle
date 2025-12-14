import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';

interface SiteSettings {
  contact_email: string;
  contact_whatsapp: string;
  contact_instagram: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    contact_email: '',
    contact_whatsapp: '',
    contact_instagram: '',
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
    ];

    try {
      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: update.value })
          .eq('key', update.key);

        if (error) throw error;
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
      </div>
    </AdminLayout>
  );
}
