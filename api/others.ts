import { LIBRARY_BUCKET } from "@/constants/Misc";
import { supabase } from "@/lib/supabase";
import { ExpertPeerSlot } from "./expert-peer/expert-peer";
import { Sessions } from "./expert-peer/sessions";

export const getFileUrl = (path: string) => {
  return supabase
    .storage
    .from(LIBRARY_BUCKET)
    .getPublicUrl(path).data.publicUrl;
};


export function returnNewSlot(expertPeerSlot: ExpertPeerSlot, groupType: string): ExpertPeerSlot[] {
  const start = new Date(expertPeerSlot.start_time);
  const end = new Date(expertPeerSlot.end_time);
  const slots: ExpertPeerSlot[] = [];
  if (groupType === "PEER") {
    const diffMs = end.getTime() - start.getTime();
    const chunkMs = 30 * 60 * 1000; // 30 minutes in ms

    if (diffMs <= chunkMs) {
      slots.push(expertPeerSlot);
      return slots;
    }

    let current = new Date(start);
    let i = 0;

    while (current.getTime() + chunkMs <= end.getTime()) {
      const chunkStart = new Date(current);
      const chunkEnd = new Date(current.getTime() + chunkMs);

      slots.push({     // keep expert_peer_id, group, etc.
        id: i,
        expert_peer_id: expertPeerSlot.expert_peer_id,
        start_time: chunkStart,
        end_time: chunkEnd,
        group: expertPeerSlot.group
      });

      current = chunkEnd;
      i++;
    }
  }

  else if (groupType === "EXPERT") {
    const diffHours = end.getHours() - start.getHours();

    if (diffHours <= 1) {
      slots.push(expertPeerSlot);
      return slots;
    }

    let current = new Date(start);

    for (let i = 0; i < diffHours; i++) {
      const chunkStart = new Date(current);
      const chunkEnd = new Date(current);
      chunkEnd.setHours(chunkEnd.getHours() + 1);

      slots.push({
        id: i,
        expert_peer_id: expertPeerSlot.expert_peer_id,
        start_time: chunkStart,
        end_time: chunkEnd,
        group: expertPeerSlot.group,
      });
      current.setHours(current.getHours() + 1);
    }
  }
  return slots;
}


export function isOverlapping(slotStart: Date, slotEnd: Date, sessionStart: Date, sessionEnd: Date) {
  return slotStart < sessionEnd && sessionStart < slotEnd;
}


export function getFreeSlots(
  expertPeerSlots: ExpertPeerSlot[],
  sessionsByDate: Sessions[]
) {
  let allChunks: ExpertPeerSlot[] = [];
  for (const slot of expertPeerSlots) {
    const chunks = returnNewSlot(slot, slot.group);
    allChunks.push(...chunks);
  }

  if (!sessionsByDate.length) return allChunks;

  const freeChunks = allChunks.filter(chunk => {
    const chunkStart = new Date(chunk.start_time);
    const chunkEnd = new Date(chunk.end_time);

    // check against every session
    for (const s of sessionsByDate) {
      const sStart = new Date(s.start_time);
      const sEnd = new Date(s.end_time);

      if (isOverlapping(chunkStart, chunkEnd, sStart, sEnd)) {
        return false; // busy
      }
    }
    return true; // free
  });

  return freeChunks;
}