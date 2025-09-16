import { Sessions, useInsertSession, useSessionsByDate } from '@/api/expert-peer/sessions';
import NewButton from '@/components/NewButton';
import { useAuth } from '@/providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { ExpertPeerSlot, useAllExpertPeerSlots } from '@/api/expert-peer/expert-peer';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-toast-message';


const BookSlot = () => {
    const { session } = useAuth();

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const { data: sessionsByDate, refetch: refetchSessions } = useSessionsByDate(session?.user.id ?? "", date);
    const { data: expertPeerSlots, refetch: refetchExpertPeerSlots } = useAllExpertPeerSlots();

    const [availableSlots, setAvailableSlots] = useState<ExpertPeerSlot[]>([]);
    const { mutate: insertSlotMutation } = useInsertSession();

    function getFreeSlots(
        expertPeerSlots: ExpertPeerSlot[],
        sessionsByDate: Sessions[]
    ): ExpertPeerSlot[] {
        let available: ExpertPeerSlot[] = [];

        for (const expertPeerSlot of expertPeerSlots) {
            // break the big slot into hourly chunks
            const chunks = returnNewSlot(expertPeerSlot);

            if (chunks) {
                for (const chunk of chunks) {
                    // is there a session for this expert at this exact start time?
                    const isBooked = sessionsByDate.some(session =>
                        session.expert_peer_id === chunk.expert_peer_id &&
                        new Date(session.start_time) < new Date(chunk.end_time) &&
                        new Date(session.end_time) > new Date(chunk.start_time)
                    );

                    if (!isBooked) {
                        available.push(chunk);
                    }
                }
            }
        }
        return available;
    }

    function returnNewSlot(expertPeerSlot: ExpertPeerSlot): ExpertPeerSlot[] {
        const start = new Date(expertPeerSlot.start_time);
        const end = new Date(expertPeerSlot.end_time);

        const diffHours = end.getHours() - start.getHours();
        const slots: ExpertPeerSlot[] = [];

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
            });
            current.setHours(current.getHours() + 1);
        }
        return slots;
    }


    useEffect(() => {
        if (expertPeerSlots && sessionsByDate) {
            const free = getFreeSlots(expertPeerSlots, sessionsByDate);
            setAvailableSlots(free);
        }
    }, [expertPeerSlots, sessionsByDate]);


    const onChange = (_event: any, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    console.log(availableSlots);
    return (
        <View>
            <Text>Book a session with an expert/peer</Text>
            <Text>Selected: {date.toLocaleString()}</Text>
            <NewButton title="Pick date/time" onPress={() => setShow(true)} />
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>S No.</DataTable.Title>
                    <DataTable.Title>Start time</DataTable.Title>
                    <DataTable.Title>End time</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>
                {
                    availableSlots.map((expertPeerSlot: ExpertPeerSlot, index: number) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{expertPeerSlot.id + 1}</DataTable.Cell>
                            <DataTable.Cell>
                                {new Date(expertPeerSlot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </DataTable.Cell>
                            <DataTable.Cell>
                                {new Date(expertPeerSlot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </DataTable.Cell>
                            <DataTable.Cell>
                                <NewButton title='Book' onPress={async () => {
                                    if (session?.user.id && expertPeerSlot.expert_peer_id) {
                                        const sessionSlot: Sessions = {
                                            id: 0, // or omit if your DB auto-generates it
                                            student_id: session.user.id,
                                            expert_peer_id: expertPeerSlot.expert_peer_id,
                                            start_time: new Date(expertPeerSlot.start_time),
                                            end_time: new Date(expertPeerSlot.end_time),
                                            status: "PENDING",
                                        };
                                        console.log("this is the object of session - " + JSON.stringify(sessionSlot));

                                        try {
                                            await insertSlotMutation(sessionSlot);
                                            Toast.show({
                                                type: 'success', // 'success' | 'error' | 'info'
                                                text1: 'Applied for session! Waiting for expert to approve it.',
                                                position: 'bottom', // or 'bottom'
                                                visibilityTime: 1500
                                            });
                                            refetchSessions();
                                            refetchExpertPeerSlots();
                                        }
                                        catch (error){
                                            console.log(error);
                                            Toast.show({
                                                type: 'error', // 'success' | 'error' | 'info'
                                                text1: 'Could not apply for session.',
                                                position: 'bottom', // or 'bottom'
                                                visibilityTime: 1500
                                            });
                                        }

                                    } else {
                                        console.warn("Missing student or expert id");
                                    }

                                }} />
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))
                }
            </DataTable>
            {
                show && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )
            }
        </View>

    )
}

export default BookSlot;