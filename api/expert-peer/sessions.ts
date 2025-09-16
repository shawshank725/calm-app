import { supabase } from "@/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

export type SessionStatus ="ACCEPTED" | "DENIED" | "PENDING";

export type Sessions = {
    id: number;
    expert_peer_id: string;
    student_id: string;
    start_time: Date;
    end_time: Date;
    status: SessionStatus;
};

export const useSessionsByDate = (userId: string, date: Date) => {
  return useQuery<Sessions[]>({
    queryKey: ["sessions", userId, date.toDateString()],
    queryFn: async () => {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .gte("start_time", startOfDay.toISOString())
        .lte("start_time", endOfDay.toISOString());

      if (error) throw new Error(error.message);
      return data as Sessions[];
    },
    enabled: !!userId && !!date,
  });
};

export const useInsertSession = () => {
  return useMutation<Sessions, Error, Sessions>({
    mutationFn: async (payload: Sessions) => {
      const { data, error } = await supabase
        .from('sessions')
        .insert([payload])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
  });
};