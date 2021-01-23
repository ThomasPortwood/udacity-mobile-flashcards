import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { moveNextPushNotificationToTomorrow } from '../utils/helpers'
import { screens } from '../utils/screens'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
})

export default function Quiz({ route, navigation }) {

  const { deck } = route.params
  const [index, setIndex] = useState(0)
  const [side, setSide] = useState('question')
  const [numCorrect, setNumCorrect] = useState(0)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (!complete) return
    moveNextPushNotificationToTomorrow()
  }, [complete])

  const onNext = (correct) => {
    setSide('question')

    if (correct)
      setNumCorrect(numCorrect + 1)

    if (index + 1 == deck.questions.length)
      setComplete(true)
    else
      setIndex(index + 1)
  }

  const onRestart = () => {
    setSide('question')
    setNumCorrect(0)
    setIndex(0)
    setComplete(false)
  }

  if (deck.questions.length === 0)
    return <Text>No Cards!</Text>

  if (complete)
    return (
      <View style={styles.view}>
        <Text h1>
          {`Correct ${(numCorrect / deck.questions.length) * 100}%`}
        </Text>
        <Button
          title='Restart Quiz'
          onPress={onRestart}
        />
        <Button
          title='Home'
          onPress={() => navigation.navigate(screens.decks)}
        />
      </View>
    )

  return (
    <View style={styles.view}>
      <Text h1>
        {deck.questions[index][side]}
      </Text>
      <Button
        title='Show Answer'
        onPress={() => setSide('answer')}
      />
      <Button
        title='Correct'
        buttonStyle={{ backgroundColor: '#00FF00' }}
        onPress={() => onNext(true)}
      />
      <Button
        title='Incorrect'
        buttonStyle={{ backgroundColor: '#FF0000' }}
        onPress={() => onNext(false)}
      />
      <Text h3>
        {`${deck?.questions.length - index} cards left`}
      </Text>
    </View>
  )
}