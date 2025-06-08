import { supabase } from "@/lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useMessageList = () => {
    return useQuery({
        queryKey: ['buddy_messages'],
        queryFn: async () => {
        //specify how we want to fetch the data.
        const {data, error} = await supabase.from("buddy_messages").select("*");
        if (error) {
            throw new Error(error.message);
        }
        return data;
        },
    })
}

export const useInsertMessage = () => {
    return useMutation({
        async mutationFn(data:any) {
            const {error, data:newMessage} = await supabase.from('buddy_messages').insert({
                message: data.content,
                user_id: data.userId,
            }).single();

            if (error) {
                throw new Error(error.message);
            }
            return newMessage;
        },
    });
}