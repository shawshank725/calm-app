import { supabase } from "@/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

export type ExpertPeerType = "EXPERT" | "PEER";

export type ExpertPeerSlot = {
    id: number;
    expert_peer_id: string | undefined;
    start_time: Date;
    end_time: Date;
    group: ExpertPeerType;
};

export const useExpertPeerSlots = (userId: string) => {
    return useQuery<ExpertPeerSlot[]>({
        queryKey: ['expert-peer-slot', userId],
        queryFn: async () => {
        const {data, error} = await supabase.from("expert_peer_slots").select("*").eq("expert_peer_id", userId).order("start_time", {ascending: true});
        if (error) {
            throw new Error(error.message);
        }
        return data;
        },
        enabled: !!userId,
    })
};


export const useAllExpertPeerSlots = () => {
    return useQuery<ExpertPeerSlot[]>({
        queryKey: ['all-expert-peer-slots'],
        queryFn: async () => {
        const {data, error} = await supabase.from("expert_peer_slots").select("*").order("start_time", {ascending: true});
        if (error) {
            throw new Error(error.message);
        }
        return data;
        }
    })
};



export const useInsertSlot = () => {
    return useMutation({
        async mutationFn(data:ExpertPeerSlot) {
            const result = await supabase.from('expert_peer_slots').insert({
                expert_peer_id: data.expert_peer_id,
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

export const useDeleteSlot = () => {
    return useMutation({
        async mutationFn(data:ExpertPeerSlot) {
            const result = await supabase.from('expert_peer_slots').delete().match({"start_time": data.start_time});
            if (result.error) {
                throw new Error(result.error.message);
            }
            return result.data;
        },
    });
}


// getting expert and peer id and their profile
export const useGetExpertPeerProfiles = () => {
    return useQuery({
        queryKey: ["expert-peer-profile"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .in("group", ["EXPERT", "PEER"]);
            if (error){
                console.log(error);
            }
            else {
                return data;
            }
        }
    })
}