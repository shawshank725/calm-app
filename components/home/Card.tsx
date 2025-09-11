import { useAppTheme } from "@/constants/themes/ThemeManager";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Image, Text,StyleSheet } from "react-native";

type HomeScreenCardProps = {
    navigateTo: string,
    opacity: number,
    imagePath: any,
    heading: string,
    description:string,

}
export const Card = ({navigateTo, opacity, imagePath,heading,description}: HomeScreenCardProps) => {
    const {styles } = useAppTheme();
    const screenStyles = styles.SupportShelf;

    const router = useRouter();
    return (
    <TouchableOpacity onPress={() => { router.navigate(navigateTo as any);}} activeOpacity={opacity}> 
        <View style={screenStyles.cardContainer}>
            <View style={screenStyles.cardImageContainer}>
                <Image source={imagePath} style={screenStyles.cardImage}/>
            </View>
            <View style={screenStyles.cardInformationContainer}>
                <Text style={screenStyles.cardHeading}>{heading}</Text>
                <Text style={screenStyles.cardDescription}>{description}</Text>
            </View>
        </View>
    </TouchableOpacity>
    )
}

const cardStyles = StyleSheet.create({
    cardContainer: {
        borderRadius: 20,
        overflow: 'hidden', 
        marginVertical: 10, 
        borderWidth: 3,
        backgroundColor: 'white'
    },
    cardImageContainer: {
        width: '100%', 
        height: 150 ,
        borderBottomWidth: 3,
    },
    cardHeading: {fontSize: 25,fontWeight: 'bold'},
    cardDescription: {color: 'grey'},
    cardInformationContainer: {padding: 10,},
    cardImage: {width: '100%',height: '100%',  }

})