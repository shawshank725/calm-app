import { supabase } from "@/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

export type ExpertSlot = {
    id: number;
    expert_id: string | undefined;
    start_time: Date;
    end_time: Date;
};

export const useExpertSlots = (userId: string) => {
    return useQuery<ExpertSlot[]>({
        queryKey: ['expert-slot', userId],
        queryFn: async () => {
        const {data, error} = await supabase.from("expert_slots").select("*").eq("expert_id", userId).order("start_time", {ascending: true});
        if (error) {
            throw new Error(error.message);
        }
        return data;
        },
        enabled: !!userId,
    })
};


export const useInsertSlot = () => {
    return useMutation({
        async mutationFn(data:ExpertSlot) {
            const result = await supabase.from('expert_slots').insert({
                expert_id: data.expert_id,
                start_time: data.start_time,
                end_time:data.end_time
            }).select().single();
            if (result.error) {
                throw new Error(result.error.message);
            }
            return result.data;
        },
    });
};