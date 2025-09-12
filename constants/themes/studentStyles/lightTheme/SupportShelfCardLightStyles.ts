import { CommonStyles } from "@/constants/themes/types";

const SupportShelfCardLightStyles: CommonStyles = {
    cardContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,

        // --- Elevation (Android) ---
        elevation: 5,
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

export default SupportShelfCardLightStyles;