import { supabase } from "@/lib/supabase";
import { ExpertLeavePayload } from "@/types/ExpertLeave";
import { useMutation } from "@tanstack/react-query";

const expert_leave = "expert_leave";


export const useInsertExpertLeave = () => {
  return useMutation({
    mutationFn: async (expertLeaveData: ExpertLeavePayload) => {
      const { data, error } = await supabase
        .from(expert_leave)
        .insert(expertLeaveData)
        .select().single();

      if (error) throw error;
      return data;
    },
  });
};