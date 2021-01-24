import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { addCardToDeck } from '../utils/storage'
import { Button, Input } from 'react-native-elements'
import { screens } from '../utils/screens'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  question: {
    minWidth: 100,
    backgroundColor: 'white',
  },
  answer: {
    minWidth: 100,
    backgroundColor: 'white'
  }
})

export default function NewQuestion({ route, navigation }) {

  const { deck } = route.params
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const onSubmit = () => {
    addCardToDeck(deck.title, { question, answer })
      .then(() => navigation.navigate(screens.individualDeck, { title: deck.title }))
  }

  return (
    <View style={styles.view}>
      <Input
        placeholder="Enter new question"
        leftIcon={{ type: 'font-awesome', name: 'question' }}
        onChangeText={value => setQuestion(value)}
      />
      <Input
        placeholder="Enter new answer"
        leftIcon={{ type: 'font-awesome', name: 'exclamation' }}
        onChangeText={value => setAnswer(value)}
      />
      <Button
        raised
        title='Submit'
        onPress={onSubmit}
      />
    </View>
  )
}