import { View, Text, Image, StyleSheet, Animated, Easing, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MyButton from '@/components/MyButton';
import NewButton from '@/components/NewButton';
import Svg, { Line, Polyline } from 'react-native-svg';
import { useMemo } from 'react';

const BOX_SIZE = 150;
const DOT_SIZE = 25;
const duration = 4000; 
const durationInSeconds = duration/1000;
const GRAPH_WIDTH = 320;
const GRAPH_HEIGHT = 200;

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

  //time setters here
  const [inhaleTime, setInhaleTime] = useState(5);
  const [exhaleTime, setExhaleTime] = useState(5);
  const [holdTime, setHoldTime] = useState(3);
  const [pauseTime, setPauseTime] = useState(2);
  const [totalTime, setTotalTime] = useState(inhaleTime + exhaleTime + holdTime + pauseTime);
  
  const dotPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  
  const {
    inhaleLineWidth,
    holdLineWidth,
    exhaleLineWidth,
    pauseLineWidth,
    x0,
    x1,
    x2,
    x3,
    x4,
    points,
    pathPoints,yTop,
  yBottom,
  } = useMemo(() => {
    const total = inhaleTime + holdTime + exhaleTime + pauseTime;

    const inhaleW = inhaleTime * GRAPH_WIDTH / total;
    const holdW = holdTime * GRAPH_WIDTH / total;
    const exhaleW = exhaleTime * GRAPH_WIDTH / total;
    const pauseW = pauseTime * GRAPH_WIDTH / total;

    const x0 = 0;
    const x1 = x0 + inhaleW;
    const x2 = x1 + holdW;
    const x3 = x2 + exhaleW;
    const x4 = x3 + pauseW;

    const yTop = 20;
    const yBottom = GRAPH_HEIGHT - 20;

    const points = `
      ${x0},${yBottom}
      ${x1},${yTop}
      ${x2},${yTop}
      ${x3},${yBottom}
      ${x4},${yBottom}
    `;

    const pathPoints = [
      { x: x0, y: yBottom },
      { x: x1, y: yTop },
      { x: x2, y: yTop },
      { x: x3, y: yBottom },
      { x: x4, y: yBottom },
    ];

    return {
      inhaleLineWidth: inhaleW,
      holdLineWidth: holdW,
      exhaleLineWidth: exhaleW,
      pauseLineWidth: pauseW,
      x0,
      x1,
      x2,
      x3,
      x4,
      points,
      pathPoints,yTop,        // ✅ Add this
  yBottom, 
    };
  }, [inhaleTime, holdTime, exhaleTime, pauseTime]);
  
  useEffect(() => {
    if (toggleState) {
      animate();
    }
  }, [inhaleTime, holdTime, exhaleTime, pauseTime, toggleState]);

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

  const animate = () => {
    dotPosition.stopAnimation();
    dotPosition.setValue({ x: x0, y: yBottom });

    Animated.sequence([
      Animated.timing(dotPosition, {
        toValue: { x: x1, y: yTop },
        duration: inhaleTime * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(dotPosition, {
        toValue: { x: x2, y: yTop },
        duration: holdTime * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(dotPosition, {
        toValue: { x: x3, y: yBottom },
        duration: exhaleTime * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(dotPosition, {
        toValue: { x: x4, y: yBottom },
        duration: pauseTime * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      dotPosition.setValue({ x: x0, y: yBottom }); // reset
      animate(); // repeat loop
    });
  };

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
          
      {/* bro 
      <View style={{alignItems: 'center'}}>
        <Text>Customizable breath timer</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>

          <View style={breathingStyles.setterContainer}>
            <Text style={breathingStyles.heading}>Inhale</Text>
            <View style={breathingStyles.buttonContainer}>
              <NewButton title='-' onPress={() => { if (inhaleTime > 1){
                                                    const newInhale = inhaleTime - 1;
                                                    const newTotal = newInhale + exhaleTime + holdTime + pauseTime;
                                                    setInhaleTime(newInhale);
                                                    setTotalTime(newTotal);
                                                    }}}/>
              <Text style={breathingStyles.timeText}>{inhaleTime}</Text>
              <NewButton title='+' onPress={() => { if (inhaleTime < 10){ 
                                                    const newInhale = inhaleTime + 1;
                                                    const newTotal = newInhale + exhaleTime + holdTime + pauseTime;
                                                    setInhaleTime(newInhale);
                                                    setTotalTime(newTotal);}}}/>
            </View>
          </View>

          <View style={breathingStyles.setterContainer}>
            <Text style={breathingStyles.heading}>Hold</Text>
            <View style={breathingStyles.buttonContainer}>
              <NewButton title='-' onPress={() => { if (holdTime > 1){ 
                                                    const newHold = holdTime - 1;
                                                    const newTotal = inhaleTime + exhaleTime + newHold + pauseTime;
                                                    setHoldTime(newHold);
                                                    setTotalTime(newTotal);}}}/>
              <Text style={breathingStyles.timeText}>{holdTime}</Text>
              <NewButton title='+' onPress={() => { if (holdTime < 10){ const newHold = holdTime + 1;
                                                    const newTotal = inhaleTime + exhaleTime + newHold + pauseTime;
                                                    setHoldTime(newHold);
                                                    setTotalTime(newTotal);}}}/>
            </View>
          </View>

          <View style={breathingStyles.setterContainer}>
            <Text style={breathingStyles.heading}>Exhale</Text>
            <View style={breathingStyles.buttonContainer}>
              <NewButton title='-' onPress={() => { if (exhaleTime > 1){ const newExhale = exhaleTime - 1;
                                                    const newTotal = inhaleTime + newExhale + holdTime + pauseTime;
                                                    setExhaleTime(newExhale);
                                                    setTotalTime(newTotal);}}}/>
              <Text style={breathingStyles.timeText}>{exhaleTime}</Text>
              <NewButton title='+' onPress={() => { if (exhaleTime < 10){ const newExhale = exhaleTime + 1;
                                                    const newTotal = inhaleTime + newExhale + holdTime + pauseTime;
                                                    setExhaleTime(newExhale);
                                                    setTotalTime(newTotal);}}}/>
            </View>
          </View>

          <View style={breathingStyles.setterContainer}>
            <Text style={breathingStyles.heading}>Pause</Text>
            <View style={breathingStyles.buttonContainer}>
              <NewButton title='-' onPress={() => { if (pauseTime > 1){ const newPause = pauseTime - 1;
                                                    const newTotal = inhaleTime + exhaleTime + holdTime + newPause;
                                                    setPauseTime(newPause);
                                                    setTotalTime(newTotal);}}}/>
              <Text style={breathingStyles.timeText}>{pauseTime}</Text>
              <NewButton title='+' onPress={() => { if (pauseTime < 10){ const newPause = pauseTime + 1;
                                                    const newTotal = inhaleTime + exhaleTime + holdTime + newPause;
                                                    setPauseTime(newPause);
                                                    setTotalTime(newTotal);}}}/>
            </View>
          </View>

        </View>

        <View style={{ height: GRAPH_HEIGHT + 20, width: GRAPH_WIDTH + 20, padding: 5,position: 'relative',}}>
          <Svg height={GRAPH_HEIGHT} width={GRAPH_WIDTH} viewBox='35 -10 200 200'  >
            <Polyline points={points} fill="none" stroke="blue" strokeWidth="2"/>
          </Svg>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: DOT_SIZE,
                height: DOT_SIZE,
                backgroundColor: 'red',
                borderRadius: DOT_SIZE / 2,
                transform: dotPosition.getTranslateTransform(),
              },
            ]}
          />
        </View><MyButton
          title="Start Dot Animation"
          onPress={() => {
            dotPosition.setValue({ x: x0, y: yBottom });
            animate();
          }}
        />

      </View>
      */}

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