import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useGetOneBook = (id: number) => {
    return useQuery({
    queryKey: ['library', id],
    queryFn: async () => { // specify how data is to be fetched
      const {data, error} = await supabase.from("library").select("*").eq("id", id).single();
      if (error){
        throw new Error(error.message);
      }
      return data;
    }
  });
}

export const useGetAllBooks = () => {
    return useQuery({
        queryKey: ['library'],
        queryFn: async () => { // specify how data is to be fetched
        const {data, error} = await supabase.from("library").select("*");
        if (error){
            throw new Error(error.message);
        }
        return data;
        }
    });
}