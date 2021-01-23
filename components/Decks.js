import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { getDecks, resetAllDecks } from '../utils/storage'
import { Button, Card, Text } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { screens } from '../utils/screens'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-around'
  }
})

export default function Decks({ navigation }) {

  const [decks, setDecks] = useState()

  useEffect(() => {
    getDecks().then(setDecks)
  })

  if (!decks)
    return <></>

  return (
    <View style={styles.view}>
      <Button
        raised
        title='New Deck'
        onPress={() => navigation.navigate(screens.newDeck)}
      />
      <Button raised title='Remove All Decks' onPress={resetAllDecks} />
      <ScrollView>
        {
          Object.entries(decks).map(([title, deck]) => (
            <TouchableOpacity
              key={title}
              onPress={() => navigation.navigate(screens.individualDeck, { deck })}
            >
              <Card>
                <Card.Title h3>{title}</Card.Title>
                <Text>{`${deck.questions.length} cards`}</Text>
              </Card>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}