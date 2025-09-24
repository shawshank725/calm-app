import { useInsertSession, useSessionsByDate } from '@/api/expert-peer/sessions';
import NewButton from '@/components/NewButton';
import { useAuth } from '@/providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { View, Text, Switch } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAllExpertPeerSlots, useGetExpertPeerProfiles } from '@/api/expert-peer/expert-peer';
import { DataTable } from 'react-native-paper';
import { bookASession, formatDate, formatTime, getFreeSlots } from '@/api/others';
import { ExpertPeerSlot } from '@/types/ExpertPeer';

const BookSlot = () => {
    const { session } = useAuth();

    const [date, setDate] = useState<Date | null>(null);
    const [show, setShow] = useState(false);
    const [hasPickedDate, setHasPickedDate] = useState(false);

    const { data: sessionsByDate, refetch: refetchSessions } = useSessionsByDate(session?.user.id ?? "", date ?? new Date());
    const { data: expertPeerSlots, refetch: refetchExpertPeerSlots } = useAllExpertPeerSlots();
    const [showPeer, setShowPeer] = useState<boolean>(false);

    const [availableSlots, setAvailableSlots] = useState<ExpertPeerSlot[]>([]);
    const { mutateAsync: insertSlotMutation } = useInsertSession();

    const { data: expertPeerDetails } = useGetExpertPeerProfiles();

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
                date && hasPickedDate && (
                    <>
                        <Text>Selected: {date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}</Text>
                        <Switch
                            value={showPeer}
                            onValueChange={async (value) => {
                                setShowPeer(value);
                            }}
                            trackColor={{ false: "grey", true: 'green' }}
                            thumbColor={"lightblue"}
                        />
                        <Text>
                            {showPeer === true ? "Showing peer slots" : "Showing expert slots"}
                        </Text>
                    </>

                )
            }
            <NewButton title="Pick date/time" onPress={() => setShow(true)} />

            {date && (
                availableSlots.filter(
                    slot => slot.group === (showPeer ? "PEER" : "EXPERT")
                ).length > 0 ? (
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>S No.</DataTable.Title>
                            <DataTable.Title>Start time</DataTable.Title>
                            <DataTable.Title>End time</DataTable.Title>
                            <DataTable.Title>Action</DataTable.Title>
                            <DataTable.Title>Expert</DataTable.Title>
                        </DataTable.Header>

                        {availableSlots
                            .filter(slot => slot.group === (showPeer ? "PEER" : "EXPERT"))
                            .map((expertPeerSlot: ExpertPeerSlot, index: number) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>{index + 1}</DataTable.Cell>
                                    <DataTable.Cell>{formatTime(expertPeerSlot.start_time)}</DataTable.Cell>
                                    <DataTable.Cell>{formatTime(expertPeerSlot.end_time)}</DataTable.Cell>
                                    <DataTable.Cell>
                                        <NewButton
                                            title="Book"
                                            onPress={() => {
                                                if (session?.user.id) {
                                                    bookASession(
                                                        session.user.id,
                                                        expertPeerSlot,
                                                        insertSlotMutation,
                                                        refetchSessions,
                                                        refetchExpertPeerSlots
                                                    );
                                                }
                                            }}
                                        />
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {showPeer
                                            ? expertPeerDetails?.find(d => d.group === "PEER")?.course ?? "Unknown course"
                                            : expertPeerDetails?.find(d => d.group === "EXPERT")?.full_name ?? "Unknown name"}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}
                    </DataTable>
                ) : (
                    <Text>
                        {showPeer
                            ? "No available peer slots found."
                            : "No available expert slots found."}
                    </Text>
                )
            )}
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