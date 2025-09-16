import { ExpertPeerSlot, useExpertPeerSlots, useInsertSlot } from '@/api/expert-peer/expert-peer';
import NewButton from '@/components/NewButton';
import { useAppTheme } from '@/constants/themes/ThemeManager';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function ExpertSlotScreen() {
    const { session } = useAuth();
    const { data: expertSlots, isLoading: isExpertSlotLoading, refetch: refetchExpertPeerSlots } = useExpertPeerSlots(session?.user.id ?? "");
    const { styles } = useAppTheme();
    const screenStyles = styles.ExpertSlotsScreen;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartTimePicker, setShowStartTimePicker] = useState<boolean>(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);
    const { mutate: insertMutate } = useInsertSlot();
    const [disabledButton, setDisabledButton] = useState<boolean>(false);

    const validateSlot = () => {
        if (!expertSlots) {
            return false;
        }
        if (startTime.getTime() === endTime.getTime()) {
            Alert.alert("Slot must of of 1 hour. Starting and ending time cannot be the same.");
            return false;
        }
        if (startTime > endTime) {
            Alert.alert("Start time cannot be greater than end time.");
            return false;
        }

        for (const slot of expertSlots) {
            const existingStart = new Date(slot.start_time);
            const existingEnd = new Date(slot.end_time);
            const newStart = new Date(startTime);
            const newEnd = new Date(endTime);

            const overlap =
                newStart < existingEnd && existingStart < newEnd;

            if (overlap) {
                Alert.alert(
                    `This time conflicts with an existing slot from ${slot.start_time} to ${slot.end_time}.`
                );
                return false;
            }
        }

        return true;
    }

    const insertSlot = async () => {
        if (validateSlot()) {
            setDisabledButton(true);
            try {
                insertMutate({
                    id: 0,
                    expert_peer_id: session?.user.id,
                    start_time: startTime,
                    end_time: endTime,
                });
                setShowModal(false);
                Toast.show({
                    type: 'success', // 'success' | 'error' | 'info'
                    text1: 'Added slot successfully',
                    position: 'bottom', // or 'bottom'
                    visibilityTime: 1500
                });
                setDisabledButton(false);
                refetchExpertPeerSlots();
            }
            catch (err) { }
        }
    }

    return (
        <View style={screenStyles.container}>
            <View style={screenStyles.slotContainer}>
                {
                    expertSlots?.length === 0 ?
                        <>
                            <Text style={screenStyles.text}>No slots found.</Text>
                            <Text style={screenStyles.text}>Click on the below button to add a new slot.</Text>
                        </> : (
                            <DataTable >
                                <DataTable.Header>
                                    <DataTable.Title>S. No</DataTable.Title>
                                    <DataTable.Title>Start Time</DataTable.Title>
                                    <DataTable.Title>End Time</DataTable.Title>
                                    <DataTable.Title>Delete</DataTable.Title>
                                </DataTable.Header>
                                {expertSlots?.map((slot: ExpertPeerSlot, index: number) => (
                                    <DataTable.Row key={slot.id}>
                                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                                        <DataTable.Cell>
                                            {new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            {new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            <Ionicons name="trash-outline" size={22} color="red" onPress={async () => {
                                                const result = await supabase.from('expert_peer_slots').delete().match({ "id": slot.id });
                                                console.log(result);
                                                if (!result.error) {
                                                    Toast.show({
                                                        type: 'success', // 'success' | 'error' | 'info'
                                                        text1: 'Deleted the slot',
                                                        position: 'bottom', // or 'bottom'
                                                        visibilityTime: 1500
                                                    });
                                                    refetchExpertPeerSlots();
                                                }
                                                else {
                                                    Toast.show({
                                                        type: 'error', // 'success' | 'error' | 'info'
                                                        text1: 'Could not delete slot',
                                                        position: 'bottom', // or 'bottom'
                                                        visibilityTime: 1500
                                                    });
                                                }
                                            }} />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        )
                }
                <NewButton title="Add new slot" onPress={() => {
                    setShowModal(true);
                }} />
            </View>
            <Modal
                visible={showModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={screenStyles.addNewSlotModalContainer}>
                    <View style={screenStyles.addNewSlotModal}>
                        <View style={screenStyles.addSlotHeader}>
                            <Text style={screenStyles.heading}>Add new slot</Text>
                            <Ionicons name="close" size={28} color="black" onPress={() => setShowModal(false)} />
                        </View>
                        <View>
                            <Text>Start Time: {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                            <NewButton title='Select start time' onPress={() => { setShowStartTimePicker(true) }} />
                            {showStartTimePicker && (
                                <DateTimePicker
                                    value={startTime}
                                    mode="time"
                                    display="default"
                                    onChange={(_, date) => {
                                        setShowStartTimePicker(false);
                                        if (date) setStartTime(date);
                                    }}
                                />
                            )}

                            <Text>End Time: {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                            <NewButton title='Select start time' onPress={() => { setShowEndTimePicker(true) }} />
                            {showEndTimePicker && (
                                <DateTimePicker
                                    value={endTime}
                                    mode="time"
                                    display="default"
                                    onChange={(_, date) => {
                                        setShowEndTimePicker(false);
                                        if (date) setEndTime(date);
                                    }}
                                />
                            )}

                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Text disabled={disabledButton} onPress={() => {
                                    insertSlot();
                                }} style={screenStyles.addText}>Add this slot</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}