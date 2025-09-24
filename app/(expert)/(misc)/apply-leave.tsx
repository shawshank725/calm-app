import NewButton from '@/components/NewButton';
import { useAppTheme } from '@/constants/themes/ThemeManager';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";

const ApplyLeave = () => {
    const {styles} = useAppTheme();
    const screenStyles = styles.ApplyLeaveScreen;

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const [hasPickedStartDate, setHasPickedStartDate] = useState(false);
    const [hasPickedEndDate, setHasPickedEndDate] = useState(false);

    const [daysCount, setDaysCount] = useState<number | null>(null);

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
        if (!startDate || !endDate) {
            Alert.alert("Error", "Please select both start and end dates.");
            return;
        }
        if (endDate < startDate) {
            Alert.alert("Error", "End date cannot be before start date.");
            return;
        }
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setDaysCount(diffDays);
    };

    return (
        <View style={screenStyles.container}>
            <NewButton title="Select start date" onPress={() => setShowStart(true)} />
            {showStart && (
                <DateTimePicker
                    value={startDate ?? new Date()}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                    minimumDate={new Date()}
                />
            )}
            {hasPickedStartDate && <Text>Start date selected: {startDate?.toDateString()}</Text>}

            <NewButton title="Select end date" onPress={() => setShowEnd(true)} />
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
    )
};

export default ApplyLeave;
