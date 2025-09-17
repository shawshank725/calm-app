import { Sessions, useInsertSession, useSessionsByDate } from '@/api/expert-peer/sessions';
import NewButton from '@/components/NewButton';
import { useAuth } from '@/providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { ExpertPeerSlot, useAllExpertPeerSlots } from '@/api/expert-peer/expert-peer';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { getFreeSlots } from '@/api/others';


const BookSlot = () => {
    const { session } = useAuth();

    const [date, setDate] = useState<Date | null>(null);
    const [show, setShow] = useState(false);
    const [hasPickedDate, setHasPickedDate] = useState(false);

    const { data: sessionsByDate, refetch: refetchSessions } = useSessionsByDate(session?.user.id ?? "", date ?? new Date());
    const { data: expertPeerSlots, refetch: refetchExpertPeerSlots } = useAllExpertPeerSlots();

    const [availableSlots, setAvailableSlots] = useState<ExpertPeerSlot[]>([]);
    const { mutateAsync: insertSlotMutation } = useInsertSession();

    

    useEffect(() => {
        if (expertPeerSlots && sessionsByDate) {
            const free = getFreeSlots(expertPeerSlots, sessionsByDate);
            setAvailableSlots(free);
        }
    }, [expertPeerSlots, sessionsByDate]);


    const onDateChange = (_: any, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            setDate(selectedDate);
            setHasPickedDate(true);
            refetchSessions();
        }
    };

    return (
        <View>
            <Text>Book a session with an expert/peer</Text>
            {
                date && hasPickedDate && <Text>Selected: {date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear()}</Text>
            }
            <NewButton title="Pick date/time" onPress={() => setShow(true)} />
            <Text>Expert slots here - </Text>
            {date && 
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>S No.</DataTable.Title>
                    <DataTable.Title>Start time</DataTable.Title>
                    <DataTable.Title>End time</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>
                {
                    availableSlots.filter(
                        slot => slot.group === "EXPERT").map((expertPeerSlot: ExpertPeerSlot, index: number) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{index+1}</DataTable.Cell>
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
                                            id: Math.floor((Math.random() * 100) + 1),
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
            </DataTable>}
            {
                show && (
                    <DateTimePicker
                        value={date ?? new Date()}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                        minimumDate={new Date()}
                    />
                )
            }
        </View>
    )
}

export default BookSlot;