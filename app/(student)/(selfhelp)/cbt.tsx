import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const tools = [
  {  image: require("../../../assets/images/self help/cbt exercises/journaling.png"),
    title: "Journaling",
    desc: "Identifying thought patterns",
  },
  {    image: require("../../../assets/images/self help/cbt exercises/nightmare.png"),
    title: "Nightmare Exposure",
    desc: "Treats nightmares. Develops new responses",
  },
  {    image: require("../../../assets/images/self help/cbt exercises/breath.png"),
    title: "Relaxed Breathing",
    desc: "Supports range of issues",
  },
  {    image: require("../../../assets/images/self help/cbt exercises/play.png"),
    title: "Play the Script until the end",
    desc: "Reflects on worst case scenario. Improves feeling of coping",
  },
  {    image: require("../../../assets/images/self help/cbt exercises/cognitive.png"),
    title: "Unraveling Cognitive Distortions",
    desc: "Identifying and challenging faulty thinking",
  },
  {
    image: require("../../../assets/images/self help/cbt exercises/relax.png"),
    title: "Progressive muscle relaxation",
    desc: "Calming Mindful focus on physical relaxation",
  },
  {
    image: require("../../../assets/images/self help/cbt exercises/cognitive restructuring.png"),
    title: "Cognitive Restructuring",
    desc: "Exploring causes of faulty thinking",
  },
  {
    image: require("../../../assets/images/self help/cbt exercises/umbrella.png"),
    title: "Interoceptive Exposure",
    desc: "Treats panic and anxiety.",
  },
  {
    image: require("../../../assets/images/self help/cbt exercises/exposure.png"),
    title: "Exposure and response prevention",
    desc: "Pur",
  },
];

const CBTExercises = () => {
  return (
    
      <ScrollView contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">

        <Text>Cognitive behavioral therapy is a 
          psycho-social intervention that focuses 
          on changing unhelpful thoughts, 
          beliefs, attitudes and beehaviours, 
          improve emotional regulation and 
          create a suite of copying strategies
          to solve problematic issues.
          </Text>

        <View >
          <Text style={styles.toolsHeading}>9 Essential CBT Tools</Text>

          {/* row 1 */}
          <View style={styles.allTools}>
            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/journaling.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Journaling</Text>
                <Text style={styles.description}>• Self-reflection</Text>
                <Text style={styles.description}>• Identifying thought</Text>
                <Text style={styles.description}>patterns</Text>
            </View>

            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/nightmare.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Nightmare Exposure</Text>
                <Text style={styles.description}>• Treats nightmares</Text>
                <Text style={styles.description}>• Develop new responses</Text>
            </View>
          </View>

          {/* row 2 */}
          <View style={styles.allTools}>
            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/breath.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Relaxed Breathing</Text>
                <Text style={styles.description}>• Supports range of issues</Text>
                <Text style={styles.description}>• Calms and focuses</Text>
            </View>

            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/play.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Play the script</Text>
                <Text style={styles.heading}>until the end</Text>
                <Text style={styles.description}>• Treats fear and anxiety</Text>
                <Text style={styles.description}>• Develop new responses</Text>
            </View>
          </View>

          {/* row 3 */}
          <View style={styles.allTools}>
            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/relax.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Progressive Muscle</Text>
                <Text style={styles.heading}>Relaxation</Text>
                <Text style={styles.description}>• Mindful focus on</Text>
                <Text style={styles.description}>physical relaxation</Text>
            </View>

            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/cognitive restructuring.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Cognitive</Text>
                <Text style={styles.heading}>Restructuring</Text>
                <Text style={styles.description}>• Exploring, reframing and </Text>
                <Text style={styles.description}>causes of faulty thinking</Text>
            </View>
          </View>

          {/* row 4 */}
          <View style={styles.allTools}>
            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/cognitive.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Unraveling</Text>
                <Text style={styles.heading}>Cognitive Distortions</Text>
                <Text style={styles.description}>• Identifying and</Text>
                <Text style={styles.description}>challenging faulty</Text>
                <Text style={styles.description}>thinking</Text>
            </View>

            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/exposure.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Exposure and</Text>
                <Text style={styles.heading}>Response Prevention</Text>
                <Text style={styles.description}>• Purposefully exposing</Text>
                <Text style={styles.description}>self to trigger</Text>
            </View>
          </View>

          <View style={{display: 'flex', alignSelf: 'center',marginBottom: 10,}}>
            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/umbrella.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Interoceptive</Text>
                <Text style={styles.heading}>Exposure</Text>
                <Text style={styles.description}>• Purposeful exposure to</Text>
                <Text style={styles.description}>sensations of panic</Text>
            </View>
          </View>
        </View>   
      </ScrollView> 
  )
}

export default CBTExercises;

const styles = StyleSheet.create({
  toolsHeading : {
    marginVertical: 15,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 10,
    backgroundColor: "#B9D9EB",
    paddingBottom: 40,
    flexGrow: 1,
  },
  allTools: {
    display: 'flex', 
    flexDirection:'row', 
    justifyContent: 'space-between',
    marginBottom: 10,
  },  
  boxContainer: {
    alignSelf: 'flex-start',
    overflow:'hidden', 
    backgroundColor: '#4682B4',  
    alignItems:"center", 
    borderRadius: 20,
    width: 178,
    height: 210, 
    borderWidth: 3,
  },
  image : {
    maxWidth: 80,
    maxHeight: 80,
  },
  imageContainer: {
    backgroundColor: '#AFEEEE',
    width: '100%',
    height: 90,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent:'center',
    borderBottomWidth: 3,
  },
  heading: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  description: {
    color: 'yellow',
    textAlign: 'left',
  },
});