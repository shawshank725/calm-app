import { CommonStyles } from "@/constants/themes/types";

const SupportShelfCardDarkStyles: CommonStyles = {
    cardContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 10,
        backgroundColor: 'white'
    },
    cardImageContainer: {
        width: '100%',
        height: 150,
    },
    cardHeading: { fontSize: 25, fontWeight: 'bold' },
    cardDescription: { color: 'grey' },
    cardInformationContainer: { padding: 10, },
    cardImage: { width: '100%', height: '100%', }
}

export default SupportShelfCardDarkStyles;