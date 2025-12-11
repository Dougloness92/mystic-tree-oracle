import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bold, 
  Italic, 
  Underline, 
  Heading2, 
  Heading3,
  Heading4,
  List, 
  ListOrdered, 
  Quote,
  Link as LinkIcon,
  Image,
  Youtube,
  Music
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export function RichTextEditor({ value, onChange, onImageUpload }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);
  const [embedType, setEmbedType] = useState<'youtube' | 'soundcloud' | 'spotify'>('youtube');

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const insertLink = () => {
    if (linkUrl) {
      execCommand('createLink', linkUrl);
      setLinkUrl('');
      setLinkDialogOpen(false);
    }
  };

  const insertEmbed = () => {
    if (!embedUrl) return;

    let embedHtml = '';
    
    if (embedType === 'youtube') {
      const videoId = extractYoutubeId(embedUrl);
      if (videoId) {
        embedHtml = `<div class="embed-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;
      }
    } else if (embedType === 'soundcloud') {
      embedHtml = `<div class="embed-container"><iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=${encodeURIComponent(embedUrl)}"></iframe></div>`;
    } else if (embedType === 'spotify') {
      const spotifyUri = extractSpotifyUri(embedUrl);
      if (spotifyUri) {
        embedHtml = `<div class="embed-container"><iframe src="https://open.spotify.com/embed/${spotifyUri}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
      }
    }

    if (embedHtml && editorRef.current) {
      execCommand('insertHTML', embedHtml);
    }
    
    setEmbedUrl('');
    setEmbedDialogOpen(false);
  };

  const extractYoutubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const extractSpotifyUri = (url: string): string | null => {
    const regex = /spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? `${match[1]}/${match[2]}` : null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      try {
        const url = await onImageUpload(file);
        execCommand('insertImage', url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', label: 'Negrito' },
    { icon: Italic, command: 'italic', label: 'Itálico' },
    { icon: Underline, command: 'underline', label: 'Sublinhado' },
    { icon: Heading2, command: 'formatBlock', value: 'h2', label: 'Título 2' },
    { icon: Heading3, command: 'formatBlock', value: 'h3', label: 'Título 3' },
    { icon: Heading4, command: 'formatBlock', value: 'h4', label: 'Título 4' },
    { icon: List, command: 'insertUnorderedList', label: 'Lista' },
    { icon: ListOrdered, command: 'insertOrderedList', label: 'Lista Numerada' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', label: 'Citação' },
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-muted border-b border-border">
        {toolbarButtons.map((btn, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand(btn.command, btn.value)}
            title={btn.label}
          >
            <btn.icon className="h-4 w-4" />
          </Button>
        ))}

        {/* Link Dialog */}
        <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="sm" title="Inserir Link">
              <LinkIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inserir Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <Button onClick={insertLink}>Inserir</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Image Upload */}
        <label>
          <Button type="button" variant="ghost" size="sm" title="Inserir Imagem" asChild>
            <span>
              <Image className="h-4 w-4" />
            </span>
          </Button>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {/* Embed Dialog */}
        <Dialog open={embedDialogOpen} onOpenChange={setEmbedDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="sm" title="Incorporar Mídia">
              <Youtube className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Incorporar Mídia</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={embedType === 'youtube' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEmbedType('youtube')}
                >
                  <Youtube className="h-4 w-4 mr-1" /> YouTube
                </Button>
                <Button
                  type="button"
                  variant={embedType === 'soundcloud' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEmbedType('soundcloud')}
                >
                  <Music className="h-4 w-4 mr-1" /> SoundCloud
                </Button>
                <Button
                  type="button"
                  variant={embedType === 'spotify' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEmbedType('spotify')}
                >
                  <Music className="h-4 w-4 mr-1" /> Spotify
                </Button>
              </div>
              <div>
                <Label htmlFor="embed-url">URL</Label>
                <Input
                  id="embed-url"
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  placeholder={`URL do ${embedType}`}
                />
              </div>
              <Button onClick={insertEmbed}>Incorporar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className={cn(
          "min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none",
          "[&_h2]:text-xl [&_h2]:font-display [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2",
          "[&_h3]:text-lg [&_h3]:font-display [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-2",
          "[&_h4]:text-base [&_h4]:font-display [&_h4]:font-semibold [&_h4]:mt-2 [&_h4]:mb-1",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic",
          "[&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4",
          "[&_a]:text-primary [&_a]:underline",
          "[&_.embed-container]:my-4 [&_.embed-container]:aspect-video",
          "[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg"
        )}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
