import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import { colorsList, fruitsList, animalsList,countriesList,emotionsList,vegetablesList } from '@/constants/WordBuilder';
import NewButton from '@/components/NewButton';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/constants/themes/ThemeManager';


const MentalFocusGrounding = () => {

  const { styles } = useAppTheme();
  const screenStyles = styles.MentalFocusScreen;

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
    <View style={screenStyles.container}>
      <Text style={screenStyles.instructions}>
        🧠 Select a category and challenge yourself to list words from A–Z!
      </Text>
      <Text style={screenStyles.instructions}>
        ✍️ Type one word or phrase per line to keep things clear.
      </Text>

      <View style={screenStyles.gameContainer}>
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
          style={screenStyles.input}
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
      
      <View style={screenStyles.answerContainer}>
        <View style={{flexDirection: 'row', alignItems:'center' , columnGap: 10,}}>
          {(resultCount > 0) ? 
            (<Ionicons name='checkmark-circle-outline' size={50} color="green"/>): 
            (<Ionicons name='close-circle-outline' size={50} color="red"/>)
          }
          <Text style={{fontSize: 20,}}>{`${resultCount} correct answers`}</Text>
        </View>
        {
          resultCount >= 0 && resultCount <= 5 ? (
            <Text style={{fontSize: 20, marginBottom: 10}}>You just started. Keep going!</Text>
          ) : resultCount <= 10 ? (
            <Text style={{fontSize: 20, marginBottom: 10}}>You can do better, kid!</Text>
          ) : resultCount <= 15 ? (
            <Text style={{fontSize: 20, marginBottom: 10}}>Good effort! You're getting there!</Text>
          ) : resultCount <= 20 ? (
            <Text style={{fontSize: 20, marginBottom: 10}}>Nice! Find more words!</Text>
          ) : resultCount <= 23 ? (
            <Text style={{fontSize: 20, marginBottom: 10}}>Great job! Almost perfect!</Text>
          ) : resultCount <= 25 ? (
            <Text style={{fontSize: 20, marginBottom: 10}}>Amazing! You're a word wizard!</Text>
          ) : resultCount === 26 ? (
            <Text style={{fontSize: 20, marginBottom: 10}}>Perfect score! You're unstoppable!</Text>
          ) : (
            <Text style={{fontSize: 20, marginBottom: 10}}>Hmm, something’s not right...</Text>
          )
        }
      </View>
    </View>
  )
}

export default MentalFocusGrounding;