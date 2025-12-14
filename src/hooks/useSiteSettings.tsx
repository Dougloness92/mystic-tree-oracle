import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  contact_email: string;
  contact_whatsapp: string;
  contact_instagram: string;
  about_subtitle: string;
  about_main_text: string;
  about_how_i_work: string;
  about_approach: string;
}

const defaultSettings: SiteSettings = {
  contact_email: "",
  contact_whatsapp: "",
  contact_instagram: "",
  about_subtitle: "",
  about_main_text: "",
  about_how_i_work: "",
  about_approach: "",
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) {
      console.error("Error fetching site settings:", error);
    } else if (data) {
      const settingsMap = data.reduce((acc, item) => {
        acc[item.key as keyof SiteSettings] = item.value;
        return acc;
      }, {} as SiteSettings);
      
      setSettings({ ...defaultSettings, ...settingsMap });
    }
    setIsLoading(false);
  };

  const getWhatsAppUrl = () => {
    if (!settings.contact_whatsapp) return "#";
    const cleanNumber = settings.contact_whatsapp.replace(/\D/g, "");
    return `https://wa.me/${cleanNumber}`;
  };

  const getInstagramUrl = () => {
    if (!settings.contact_instagram) return "#";
    const handle = settings.contact_instagram.replace("@", "");
    return `https://instagram.com/${handle}`;
  };

  const getEmailUrl = () => {
    if (!settings.contact_email) return "#";
    return `mailto:${settings.contact_email}`;
  };

  return {
    settings,
    isLoading,
    getWhatsAppUrl,
    getInstagramUrl,
    getEmailUrl,
  };
};
