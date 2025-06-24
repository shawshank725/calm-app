import { View, ActivityIndicator } from "react-native";

export const  CustomActivityIndicator1 = () => {
    return (
    <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={60} color={"green"}/>
    </View> 
    );
}