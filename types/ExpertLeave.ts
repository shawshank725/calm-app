// this is the data that we will get from database table expert_leave
export type ExpertLeaveFromDB = {
    id: string;
    expert_id: string;
    start_date: string;
    end_date: string;
};

// this is the data that will be sent to database
export type ExpertLeavePayload = {
    expert_id: string;
    start_date: string;
    end_date: string;
};