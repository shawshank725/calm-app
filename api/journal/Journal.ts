import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";


export const useInsertMessage = () => {
    return useMutation({
        async mutationFn(data:any) {
            const {error, data:newMessage} = await supabase.from('journal').insert({
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