import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export type ExpertSlot = {
    id: number;
    expert_id: string;
    start_time: Date;
    end_time: Date;
};

export const useExpertSlots = (userId: string) => {
    return useQuery<ExpertSlot[]>({
        queryKey: ['expert-slot', userId],
        queryFn: async () => {
        const {data, error} = await supabase.from("expert_slots").select("*").eq("expert_id", userId);
        if (error) {
            throw new Error(error.message);
        }
        return data;
        },
        enabled: !!userId,
    })
};
