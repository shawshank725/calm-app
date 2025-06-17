import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MyButton from '@/components/MyButton';

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
    <View style={styles.container}>

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
      <View>
      </View>
    </View>
  )
}

export default Breathing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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