import { View, Text, Image, StyleSheet, Animated, Easing, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MyButton from '@/components/MyButton';
import NewButton from '@/components/NewButton';
import Svg, { Circle,Line } from 'react-native-svg';


const BOX_SIZE = 150;
const DOT_SIZE = 25;
const duration = 4000; 
const durationInSeconds = duration/1000;

const instructions = {
  inhale: `Breathe in for ${durationInSeconds} seconds`,
  hold: `Hold for ${durationInSeconds} seconds`,
  exhale: `Breathe out for ${durationInSeconds} seconds`,
};

const Breathing = () => {
  const isAnimating = useRef(false);
  const position = useRef(new Animated.ValueXY({ x:0-DOT_SIZE/2, y: 0-DOT_SIZE/2 })).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const [toggleState, setToggleState] = useState(false); 

  
  const [inhaleTime, setInhaleTime] = useState(5);
  const [exhaleTime, setExhaleTime] = useState(5);
  const [holdTime, setHoldTime] = useState(3);
  const [pauseTime, setPauseTime] = useState(2);
  const [totalTime, setTotalTime] = useState(inhaleTime + exhaleTime + holdTime + pauseTime);

 

  const createLoopAnimation = () => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: { x: BOX_SIZE - DOT_SIZE / 2, y: 0 - DOT_SIZE / 2 },
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(position, {
          toValue: { x: BOX_SIZE - DOT_SIZE / 2, y: BOX_SIZE - DOT_SIZE / 2 },
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(position, {
          toValue: { x: 0 - DOT_SIZE / 2, y: BOX_SIZE - DOT_SIZE / 2 },
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(position, {
          toValue: { x: 0 - DOT_SIZE / 2, y: 0 - DOT_SIZE / 2 },
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    );
  };

  useEffect(() => {
    animationRef.current = createLoopAnimation();
    isAnimating.current = false;
  }, []);



  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.boxBreathingContainer}>
        <Text style={styles.instructionText}>{instructions.inhale}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          
          <Text style={styles.holdText}>{instructions.hold}</Text>
          <View>
            <View style={styles.square} />
            <Animated.View style={[styles.dot, position.getLayout()]} />
          </View>
          <Text style={styles.holdText}>{instructions.hold}</Text>
        </View>
        <Text style={styles.instructionText}>{instructions.exhale}</Text>
        <View style={styles.buttonContainer}>
          <MyButton
            title={toggleState ? "Restart" : "Start"}
            onPress={() => {
              if (isAnimating.current) {
                animationRef.current?.stop();
                position.setValue({ x: -DOT_SIZE / 2, y: -DOT_SIZE / 2 });
              }

              animationRef.current = createLoopAnimation();
              
              animationRef.current.start(() => { isAnimating.current = false; });
              isAnimating.current = true;
              setToggleState(true); 
            }}
          />
          <MyButton title='Reset' onPress={() => {
            animationRef.current?.reset();
            position.setValue({ x: -DOT_SIZE / 2, y: -DOT_SIZE / 2 });
            setToggleState(false);
          }} />
        </View>
      </View>

      <Line />

      {/* Breath timer */}
      <View style={{alignItems: 'center'}}>
        <Text>Customizable breath timer</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>

          {/* inhale seconds setter */}
          <View style={breathingStyles.setterContainer}>
            <Text style={breathingStyles.heading}>Inhale</Text>
            <View style={breathingStyles.buttonContainer}>
              <NewButton title='-' onPress={() => { if (inhaleTime > 1){setInhaleTime(inhaleTime- 1); setTotalTime(inhaleTime + exhaleTime + holdTime + pauseTime);}}}/>
              <Text style={breathingStyles.timeText}>{inhaleTime}</Text>
              <NewButton title='+' onPress={() => { if (inhaleTime < 10){ setInhaleTime(inhaleTime + 1); setTotalTime(inhaleTime + exhaleTime + holdTime + pauseTime);}}}/>
            </View>
          </View>

          {/* hold seconds setter */}
          <View style={breathingStyles.setterContainer}>
            <Text style={breathingStyles.heading}>Hold</Text>
            <View style={breathingStyles.buttonContainer}>
              <NewButton title='-' onPress={() => { if (holdTime > 1){ setHoldTime(holdTime- 1); setTotalTime(inhaleTime + exhaleTime + holdTime + pauseTime);}}}/>
              <Text style={breathingStyles.timeText}>{holdTime}</Text>
              <NewButton title='+' onPress={() => { if (holdTime < 10){ setHoldTime(holdTime + 1); setTotalTime(inhaleTime + exhaleTime + holdTime + pauseTime);}}}/>
            </View>
          </View>

          {/* exhale seconds setter */}
          <View style={breathingStyles.setterContainer}>
            <Text style={breathingStyles.heading}>Exhale</Text>
            <View style={breathingStyles.buttonContainer}>
              <NewButton title='-' onPress={() => { if (exhaleTime > 1){ setExhaleTime(exhaleTime- 1); setTotalTime(inhaleTime + exhaleTime + holdTime + pauseTime);}}}/>
              <Text style={breathingStyles.timeText}>{exhaleTime}</Text>
              <NewButton title='+' onPress={() => { if (exhaleTime < 10){ setExhaleTime(exhaleTime + 1); setTotalTime(inhaleTime + exhaleTime + holdTime + pauseTime);}}}/>
            </View>
          </View>

          {/* pause seconds setter */}
          <View style={breathingStyles.setterContainer}>
            <Text style={breathingStyles.heading}>Pause</Text>
            <View style={breathingStyles.buttonContainer}>
              <NewButton title='-' onPress={() => { if (pauseTime > 1){ setPauseTime(pauseTime- 1); setTotalTime(inhaleTime + exhaleTime + holdTime + pauseTime);}}}/>
              <Text style={breathingStyles.timeText}>{pauseTime}</Text>
              <NewButton title='+' onPress={() => { if (pauseTime < 10){ setPauseTime(pauseTime + 1); setTotalTime(inhaleTime + exhaleTime + holdTime + pauseTime);}}}/>
            </View>
          </View>

        </View>

        <View style={{height: 200, width: 300, borderWidth: 2 }}>
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            
          </Svg>
        </View>

      </View>
    </ScrollView>
  )
}

export default Breathing;

const breathingStyles = StyleSheet.create({
  setterContainer: {
    flexDirection: 'column', 
    alignItems: 'center',
    borderWidth: 2,
    margin: 5,
    borderRadius: 10,
    borderColor: 'gainsboro',
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 70,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  timeText:{
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 3,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  square: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'yellow',
    borderWidth: 3,
    borderRadius: 10,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    position: 'absolute',
    backgroundColor: '#50C878',
    borderRadius: DOT_SIZE,
    borderWidth: 3,
  },
  boxBreathingContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
   },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  instructionText: {
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 15,
  },
  holdText: {
    fontWeight: 'bold',
    fontSize: 15,
    width: 80,
    textAlign: 'center',
    marginHorizontal: 10,
  }
});