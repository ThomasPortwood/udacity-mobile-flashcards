import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { screens } from '../utils/screens'
import { removeDeck } from '../utils/storage'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default function IndividualDeck({ route, navigation }) {

  const { deck } = route.params

  if (!deck)
    return <></>

  return (
    <View style={styles.view}>
      <Text h1>{`${deck.title}: ${deck.questions.length} cards`}</Text>
      <Button
        raised
        title='Start Quiz'
        onPress={() => navigation.navigate(screens.quiz, { deck })}
      />
      <Button
        raised
        title='Add Question'
        onPress={() => navigation.navigate(screens.newQuestion, { deck })}
      />
      <Button
        raised
        title='Delete Deck'
        onPress={() => {
          removeDeck(deck.title)
          navigation.navigate(screens.decks)
        }}
      />
    </View >
  )
}