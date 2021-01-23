import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Decks from './components/Decks'
import IndividualDeck from './components/IndividualDeck'
import NewQuestion from './components/NewQuestion'
import NewDeck from './components/NewDeck'
import Quiz from './components/Quiz'
import { screens } from './utils/screens'
import { getNotificationPermission } from './utils/helpers'

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    getNotificationPermission()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Decks">
        <Stack.Screen name={screens.decks} component={Decks} />
        <Stack.Screen name={screens.individualDeck} component={IndividualDeck} />
        <Stack.Screen name={screens.newDeck} component={NewDeck} />
        <Stack.Screen name={screens.newQuestion} component={NewQuestion} />
        <Stack.Screen name={screens.quiz} component={Quiz} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}