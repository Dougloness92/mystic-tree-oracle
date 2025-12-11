import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ImageUpload, uploadContentImage } from '@/components/admin/ImageUpload';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import { z } from 'zod';
import DOMPurify from 'dompurify';

const postSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  slug: z.string().min(1, 'Slug é obrigatório').max(200, 'Slug muito longo')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  category: z.enum(['astrology', 'tarot', 'numerology', 'rituals', 'healing', 'monthly']),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
});

const categories = [
  { value: 'astrology', label: 'Astrologia' },
  { value: 'tarot', label: 'Tarot' },
  { value: 'numerology', label: 'Numerologia' },
  { value: 'rituals', label: 'Rituais' },
  { value: 'healing', label: 'Cura' },
  { value: 'monthly', label: 'Mensal' },
];

export default function AdminPostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditing = id && id !== 'new';

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('astrology');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setCategory(data.category);
      setContent(data.content);
      setCoverImageUrl(data.cover_image_url);
      setPublished(data.published);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Erro ao carregar post');
      navigate('/admin/posts');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    // Sanitize content
    const sanitizedContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'u', 'strong', 'em', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'div', 'iframe', 'span'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'width', 'height', 'frameborder', 'allowfullscreen', 'allow', 'scrolling', 'target'],
    });

    // Validate
    const result = postSchema.safeParse({
      title,
      slug,
      category,
      content: sanitizedContent,
    });

    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsSaving(true);

    try {
      const postData = {
        title,
        slug,
        category,
        content: sanitizedContent,
        cover_image_url: coverImageUrl,
        published,
        author_id: user?.id,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Post atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('posts')
          .insert(postData);

        if (error) {
          if (error.code === '23505') {
            toast.error('Já existe um post com este slug');
            return;
          }
          throw error;
        }
        toast.success('Post criado com sucesso!');
      }

      navigate('/admin/posts');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Erro ao salvar post');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/posts')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-display text-3xl text-primary">
            {isEditing ? 'Editar Post' : 'Novo Post'}
          </h1>
        </div>

        <div className="grid gap-6">
          {/* Basic Info */}
          <Card className="card-mystical">
            <CardHeader>
              <CardTitle className="font-display">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Título do post"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="titulo-do-post"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <Label htmlFor="published">Publicar</Label>
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card className="card-mystical">
            <CardHeader>
              <CardTitle className="font-display">Imagem de Capa</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={coverImageUrl || undefined}
                onChange={(url) => setCoverImageUrl(url)}
              />
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="card-mystical">
            <CardHeader>
              <CardTitle className="font-display">Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={content}
                onChange={setContent}
                onImageUpload={uploadContentImage}
              />
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate('/admin/posts')}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
