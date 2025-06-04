import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { selfHelpStyles as styles } from "@/styles/SelfHelpStyles";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.box}>
          <View style={styles.headingContainer}>
            <Text style={styles.boxHeading}>Mind and Emotion</Text>
          </View>
          <View style={styles.contentContainer}>
            <Link href={"/(student)/(selfhelp)/grounding"}>
              <Text style={styles.subHeading}>Grounding techniques</Text>
            </Link>
            <Link href={"/(student)/(selfhelp)/cbt"}>
              <Text style={styles.subHeading}>CBT exercises</Text>
            </Link>
            <Text style={styles.subHeading}>Anxiety-exam stress</Text>
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.headingContainer}>
            <Text style={styles.boxHeading}>Body & Movement</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.subHeading}>Stretch Videos</Text>
            <Text style={styles.subHeading}>Shake it out</Text>
            <Text style={styles.subHeading}>Guided Body Scan</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
