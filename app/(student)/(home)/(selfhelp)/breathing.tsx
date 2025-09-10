import { View, Text, Image, StyleSheet, Animated, Easing, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MyButton from '@/components/MyButton';
import { Line } from 'react-native-svg';
import { useMemo } from 'react';
import { useAppTheme } from '@/constants/themes/ThemeManager';

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

  const { styles } = useAppTheme();
  const screenStyles = styles.BreathingScreen; 
  
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
      pathPoints,yTop,       
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
    <ScrollView style={screenStyles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={screenStyles.boxBreathingContainer}>
        <Text style={screenStyles.instructionText}>{instructions.inhale}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          
          <Text style={screenStyles.holdText}>{instructions.hold}</Text>
          <View>
            <View style={screenStyles.square} />
            <Animated.View style={[screenStyles.dot, position.getLayout()]} />
          </View>
          <Text style={screenStyles.holdText}>{instructions.hold}</Text>
        </View>
        <Text style={screenStyles.instructionText}>{instructions.exhale}</Text>
        <View style={screenStyles.buttonContainer}>
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
    </ScrollView>
  )
}

export default Breathing;