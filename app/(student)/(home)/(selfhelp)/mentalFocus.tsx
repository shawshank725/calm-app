import { View, StyleSheet,Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import { colorsList, fruitsList, animalsList,countriesList,emotionsList,vegetablesList } from '@/constants/WordBuilder';
import NewButton from '@/components/NewButton';
import { Ionicons } from '@expo/vector-icons';


const MentalFocusGrounding = () => {

  const [text, setText] = useState("");
  const [selected, setSelected] = useState("");
  const [resultCount, setResultCount] = useState(0);

  const data = [
      {key:'1', value:'Colors'},
      {key:'2', value:'Fruits'},
      {key:'3', value:'Animals'},
      {key:'4', value:'Countries'},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Emotions'},
  ];

  const checkAnswers = () => {
    if (!selected){
      Alert.alert("No category selected","Select some category.");
      return;
    }

    if (text == ""){
      Alert.alert("No answer entered","Enter some answer.");
      return;      
    }
    let correctList: string[] = [];

    switch (selected) {
      case "Colors": correctList = colorsList; break;
      case "Fruits": correctList = fruitsList; break;
      case "Animals": correctList = animalsList; break;
      case "Countries": correctList = countriesList; break;
      case "Vegetables": correctList = vegetablesList; break;
      case "Emotions": correctList = emotionsList; break;
    }

    const answerList = text.split("\n");
    const count = checkSubset(answerList, correctList);
    setResultCount(count);
  }

  const checkSubset = (userList: string[], correctList: string[]) => {
    let count = 0;
    const normalizedCorrect = correctList.map(item => item.trim().toLowerCase());
    const userListCorrected = removeDuplicates(userList);

    const alphabetsDictionary: { [key: string]: number } = {};
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(97 + i); // 'a' to 'z'
      alphabetsDictionary[letter] = 0;
    }

    for (const word of userListCorrected) {
      const cleaned = word.trim().toLowerCase();
      const firstChar = cleaned.charAt(0); 

      if (normalizedCorrect.includes(cleaned) && firstChar >= 'a' && firstChar <= 'z') {
        if (alphabetsDictionary[firstChar] === 0) {
          alphabetsDictionary[firstChar] = 1;
          count += 1;
        }
      }
    }

    return count; 
  };

  const removeDuplicates = (list: string[]) => {  return [...new Set(list)];  }

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        🧠 Select a category and challenge yourself to list words from A–Z!
      </Text>
      <Text style={styles.instructions}>
        ✍️ Type one word or phrase per line to keep things clear.
      </Text>

      <View style={styles.gameContainer}>
        <SelectList 
          setSelected={(value: string) => setSelected(value)}
          data={data} 
          save="value"
        />
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Your answer"
          mode="outlined"
          multiline={true}
          numberOfLines={3} 
          style={textBoxStyles.input}
          label="Your answer"                
          outlineStyle={{ borderWidth: 2 }}
          theme={{roundness: 10, 
          colors: {
              primary: "black",
              outline: "black",
          },
          }}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <NewButton title="Check answers" onPress={() => {checkAnswers();}}/>
        <NewButton title="Clear answers" onPress={() => {setText(""); setResultCount(0);}}/>
      </View>
      
      <View style={styles.answerContainer}>
        <View style={{flexDirection: 'row', alignItems:'center' , columnGap: 10,}}>
          <Ionicons name='checkmark-circle-outline' size={50} color="green" style={{ }}/>
          <Text style={{fontSize: 20,}}>{`${resultCount} correct answers`}</Text>
        </View>
      </View>

    </View>
  )
}

export default MentalFocusGrounding;

const textBoxStyles = StyleSheet.create({
  input: {
    backgroundColor: '#E1EBEE',
    textDecorationColor: 'none',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightgreen'
  },
  instructions: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  gameContainer: {
    padding: 10, 
    backgroundColor: 'white',
    rowGap: 5,
    borderRadius: 10, 
  },
  answerContainer: {
    backgroundColor: 'white',
    borderRadius: 10, 
    alignItems: 'center',
    padding: 5,
  }
});