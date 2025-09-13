import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export type Book = {
  id: number;
  book_name: string;
  book_author: string;
  description: string;
  thumbnail_url: string;
  pdf_url: string;
  page_count: number;
}

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

export const useGetThreeBooks = () => {
  return useQuery<Book[]>({
    queryKey: ['library'],
    queryFn: async () => { // specify how data is to be fetched
    const {data, error} = await supabase.from("library").select("*").limit(3);
    if (error){
        throw new Error(error.message);
    }
    return data;
    }
  });
}

export const useGetAllBooksByAuthor = (book_author: string) => {
return useQuery({
    queryKey: ['library', book_author],
    queryFn: async () => { // specify how data is to be fetched
    const {data, error} = await supabase.from("library").select("*").eq("book_author", book_author);
    if (error){
        throw new Error(error.message);
    }
    return data;
    }
  });
}

export const useGetAllBooksAndAuthors = (input: string) => {
  return useQuery({
    queryKey: ["merged-books-and-authors", input],
    queryFn: async () => {
      const [booksRes, authorsRes] = await Promise.all([
        supabase.from("library").select("*").ilike("book_name", `%${input}%`),
        supabase.from("library").select("*").ilike("book_author", `%${input}%`)
      ]);

      if (booksRes.error || authorsRes.error) {
        throw booksRes.error || authorsRes.error;
      }

      // Merge and remove duplicates based on unique `id`
      const merged = [...booksRes.data, ...authorsRes.data];
      const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());

      return unique;
    },
    enabled: !!input.trim(),
  });
};

