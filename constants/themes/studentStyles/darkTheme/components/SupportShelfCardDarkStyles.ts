import { CommonStyles } from "@/constants/themes/types";

const SupportShelfCardDarkStyles: CommonStyles = {
    cardContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 10,
        backgroundColor: 'black',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,

        elevation: 5,
    },
    cardImageContainer: {
        width: '100%',
        height: 150,
    },
    cardHeading: { fontSize: 25, fontWeight: 'bold', color:'white' },
    cardDescription: { color: 'grey' },
    cardInformationContainer: { padding: 10, },
    cardImage: { width: '100%', height: '100%', }
}

export default SupportShelfCardDarkStyles;