import { StyleSheet, View } from "react-native";

type StyleName = keyof typeof styles;

export const Line = ({ styleName = "line" }: { styleName?: StyleName }) => {
    return (
        <View style={styles[styleName]} />
    );
};

const styles = StyleSheet.create({
    line: {
        borderWidth: 2,
        borderColor: 'black',
        width: '100%',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    dashedLine: {
        borderWidth: 2,
        borderColor: 'gray',
        borderStyle: 'dashed',
        width: '100%',
        marginVertical: 10,
    },
    thickLine: {
        borderWidth: 4,
        borderColor: 'red',
        width: '100%',
        marginVertical: 5,
    },
    whiteSeparator: {
        borderWidth: 0.5,
        borderColor: 'grey',
        width: '100%',
        marginVertical: 5,
    }
});
