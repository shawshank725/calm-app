import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { ReactNode, useState } from 'react'
import Collapsible from 'react-native-collapsible';
import NewButton from '@/components/NewButton';


type Item = {
  title: string,
  children: ReactNode
}

const AccordionItem = ({ title, children }: Item) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={accordionStyles.item}>
      <TouchableOpacity
        style={accordionStyles.header}
        onPress={() => setCollapsed(!collapsed)}
      >
        <Text style={accordionStyles.headerText}>{title}</Text>
      </TouchableOpacity>

      <Collapsible collapsed={collapsed}>
        <View style={accordionStyles.body}>
          {children}
        </View>
      </Collapsible>
    </View>
  );
};
const BodyMovementExercises = () => {
  return (
    <View style={styles.container}>
      <AccordionItem title="Progressive Muscle Scan">
        <Text>Relax each part of your body slowly from toes to head.</Text>
      </AccordionItem>

      <AccordionItem title="Finger Trace Breathing">
        <Text>Trace your hand or shape on screen while breathing deeply.</Text>
      </AccordionItem>
    </View>
  )
}

export default BodyMovementExercises;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent'
  },
});

const accordionStyles = StyleSheet.create({
  item: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  header: {
    padding: 12,
    backgroundColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    padding: 12,
    backgroundColor: '#fff',
  },
})