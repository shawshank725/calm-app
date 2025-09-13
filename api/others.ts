import { LIBRARY_BUCKET } from "@/constants/Misc";
import { supabase } from "@/lib/supabase";

export const getFileUrl = (path: string) => {
    return supabase
      .storage
      .from(LIBRARY_BUCKET)
      .getPublicUrl(path).data.publicUrl;
  };