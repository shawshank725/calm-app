import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

export const useProfilePhoto = (userId: string | null | undefined) => {
  return useQuery({
    queryKey: ["profile-photo", userId],
    queryFn: async () => {
      if (!userId) return defaultImage;

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", userId)
        .single();

      if (error) throw new Error(error.message);

      if (!data?.avatar_url) return defaultImage;

      const { data: publicUrl } = supabase
        .storage
        .from("profile-photos")
        .getPublicUrl(data.avatar_url);

      return publicUrl.publicUrl ? `${publicUrl.publicUrl}?t=${Date.now()}` : defaultImage;

    },
    enabled: !!userId, // only runs when userId is available
  });
};