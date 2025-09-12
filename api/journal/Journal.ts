import { supabase } from "@/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useJournalList = (userId: string) => {
    return useQuery({
        queryKey: ['journal', userId],
        queryFn: async () => {
        //specify how we want to fetch the data.
        const {data, error} = await supabase.from("journal").select("*").eq("user_id", userId);
        if (error) {
            throw new Error(error.message);
        }
        return data;
        },
        enabled: !!userId,
    })
};

export const useInsertMessage = () => {
    return useMutation({
        async mutationFn(data:any) {
            const result = await supabase.from('journal').insert({
                content: data.content,
                user_id: data.userId,
                created_at: data.created_at
            }).select().single();
            if (result.error) {
                throw new Error(result.error.message);
            }
            return result.data;
        },
    });
};