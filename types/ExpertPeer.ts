
export type ExpertPeerType = "EXPERT" | "PEER";

export type ExpertPeerSlot = {
    id: number;
    expert_peer_id: string | undefined;
    start_time: Date;
    end_time: Date;
    group: ExpertPeerType;
};
