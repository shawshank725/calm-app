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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>

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
          <View style={styles.allTools}>
            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/journaling.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Self-reflection</Text>
                <Text style={styles.description}>Identifying</Text>
                <Text style={styles.description}>thought patterns</Text>
            </View>

            <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={require("../../../assets/images/self help/cbt exercises/nightmare.png")} style={styles.image}/>
                </View>
                <Text style={styles.heading}>Nightmare Exposure</Text>
                <Text style={styles.description}>Treats nightmares</Text>
                <Text style={styles.description}>Develop new responses</Text>
            </View>
          </View>

        </View>   
      </ScrollView> 
    </View>
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
  container: {
    padding: 20,
    backgroundColor: "#B9D9EB",
    flex: 1,
  },
  allTools: {
    display: 'flex', 
    flexDirection:'row', 
    justifyContent: 'space-between'
  },  
  boxContainer: {
    alignSelf: 'flex-start',
    overflow:'hidden', 
    backgroundColor: '#4682B4',  
    alignItems:"center", 
    borderRadius: 20,
    width: 168,
    height: 170, 
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
    fontSize: 17,
  },
  description: {
    color: 'yellow'
  },
  scrollContainer: {
    paddingVertical: 0,
    paddingBottom: 40,
  },
});