import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { screens } from '../utils/screens'
import { getDeck, removeDeck } from '../utils/storage'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default function IndividualDeck({ route, navigation }) {

  const { title } = route.params
  const [deck, setDeck] = useState()

  useEffect(() => { getDeck(title).then(setDeck) })

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