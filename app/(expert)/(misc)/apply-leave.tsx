import NewButton from '@/components/NewButton';
import { useAppTheme } from '@/constants/themes/ThemeManager';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { QUICK_ACCESS_BUTTON_ICON_COLOR } from '@/constants/Misc';
import { useInsertExpertLeave } from '@/api/leaves/ExpertLeavesAPI';
import { useAuth } from '@/providers/AuthProvider';
import Toast from 'react-native-toast-message';

const ApplyLeave = () => {
    const { styles } = useAppTheme();
    const screenStyles = styles.ApplyLeaveScreen;

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const [hasPickedStartDate, setHasPickedStartDate] = useState(false);
    const [hasPickedEndDate, setHasPickedEndDate] = useState(false);

    const [daysCount, setDaysCount] = useState<number | null>(null);
    const [description, setDescription] = useState("");
    const { mutate: insertLeave, isPending, isError, data } = useInsertExpertLeave();
    const { session } = useAuth();

    const onStartDateChange = (_: any, selectedDate?: Date) => {
        setShowStart(false);
        if (selectedDate) {
            setStartDate(selectedDate);
            setHasPickedStartDate(true);
        }
    };

    const onEndDateChange = (_: any, selectedDate?: Date) => {
        setShowEnd(false);
        if (selectedDate) {
            setEndDate(selectedDate);
            setHasPickedEndDate(true);
        }
    };

    const handleApplyLeave = () => {
        if (!startDate || !endDate || !description) {
            Alert.alert("Error", "Please select both start and end dates and the reason for leave.");
            return;
        }
        if (endDate < startDate) {
            Alert.alert("Error", "End date cannot be before start date.");
            return;
        }
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setDaysCount(diffDays);

        if (session) {
            insertLeave(
                {
                    expert_id: session.user.id,
                    start_date: startDate,
                    end_date: endDate,
                    description: description,
                },
                {
                    onSuccess: (data) => {
                        console.log("Leave inserted:", data);
                        Toast.show({ type: 'success', text1: 'Leave successfully applied.',position: 'bottom' });
                    },
                    onError: (err) => {
                        console.error("Error inserting leave:", err);
                        Toast.show({ type: 'error', text1: "Couldn't apply leave.",position: 'bottom' });
                    },
                }
            );
        }
    };

    return (
        <View style={screenStyles.container}>
            <View style={screenStyles.cardContainer}>
                <Text>Description</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter reason for leave"
                    mode="outlined"
                    style={screenStyles.input}
                    label="Reason"
                    outlineStyle={{ borderWidth: 2 }}
                    theme={{
                        roundness: 10,
                        colors: {
                            primary: "black",
                            outline: "black",
                        },
                    }}
                />

                <View style={{ display: 'flex', flexDirection: 'row', columnGap: 10, justifyContent: 'space-between' }}>
                    <View style={screenStyles.datePickerContainer}>
                        <Text>
                            From: {hasPickedStartDate ? startDate?.toDateString() : ""}
                        </Text>
                        <View style={screenStyles.calendarIcon} >
                            <Ionicons name="calendar-outline" size={20} color={QUICK_ACCESS_BUTTON_ICON_COLOR} onPress={() => setShowStart(true)} />
                        </View>
                    </View>

                    <View style={screenStyles.datePickerContainer}>
                        <Text>
                            To: {hasPickedEndDate ? endDate?.toDateString() : ""}
                        </Text>
                        <View style={screenStyles.calendarIcon}>
                            <Ionicons name="calendar-outline" size={20} color={QUICK_ACCESS_BUTTON_ICON_COLOR} onPress={() => setShowEnd(true)} />
                        </View>
                    </View>
                </View>
                {showStart && (
                    <DateTimePicker
                        value={startDate ?? new Date()}
                        mode="date"
                        display="default"
                        onChange={onStartDateChange}
                        minimumDate={new Date()}
                    />
                )}
                {showEnd && (
                    <DateTimePicker
                        value={endDate ?? new Date()}
                        mode="date"
                        display="default"
                        onChange={onEndDateChange}
                        minimumDate={new Date()}
                    />
                )}
                {hasPickedEndDate && <Text>End date selected: {endDate?.toDateString()}</Text>}

                <NewButton title="Apply leave" onPress={handleApplyLeave} />
                {daysCount !== null && <Text>Applying leave for {daysCount} day{daysCount > 1 ? "s" : ""}</Text>}
            </View>
        </View>
    )
};

export default ApplyLeave;
