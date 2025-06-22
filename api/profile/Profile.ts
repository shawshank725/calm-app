import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

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

export const useProfile = (userId: string | null | undefined) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, username, group, avatar_url")
        .eq("id", userId)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!userId, // only runs if userId is available
  });
};

export const useSaveProfileChanges = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; username: string; full_name: string }) => {
      const { error, data: updatedProfile } = await supabase
        .from("profiles")
        .update({
          username: data.username,
          full_name: data.full_name, 
        })
        .eq("id", data.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return updatedProfile;
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['profile', variables.id], 
      });
      Toast.show({
        type: 'success',
        text1: 'Changes saved',
        text2: 'Your profile was updated successfully.',
        position: 'bottom',
      });
    },
  });
};