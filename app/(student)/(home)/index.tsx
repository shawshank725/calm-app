import { View,  Text, } from "react-native";
import React, { useState } from "react";
import { Card } from "@/components/home/Card";
import { useAppTheme } from "@/constants/themes/ThemeManager";
import DateTimePicker from "@react-native-community/datetimepicker";
import NewButton from "@/components/NewButton";

export default function HomeScreen() {
  const { styles } = useAppTheme();
  const screenStyles = styles.HomeScreen;

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (_event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={screenStyles?.container}> 

      <Card navigateTo={"/(student)/(library)"} 
        opacity={0.7} 
        imagePath={require("assets/images/library-card-photo.jpg")} 
        heading={"The Support Shelf"} 
        description={"Explore self-help books and inspiring stories to guide your growth."} 
      />      

      <Text>Selected: {date.toLocaleString()}</Text>

      <NewButton title="Pick date/time" onPress={() => setShow(true)} />

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

    </View>
  );
}
