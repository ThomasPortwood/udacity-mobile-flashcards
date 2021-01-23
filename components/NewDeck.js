import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { saveDeckTitle } from '../utils/storage'
import { Button, Text, Input } from 'react-native-elements'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    backgroundColor: 'white',
  },
})

export default function NewDeck({ navigation }) {

  const [title, setTitle] = useState()

  const onSubmit = () => {
    saveDeckTitle(title).then(() => navigation.navigate('Decks'))
  }

  return (
    <View style={styles.view}>
      <Input
        onChangeText={text => setTitle(text)}
        placeholder='Title for new deck'
      />
      <Button title='Submit' onPress={onSubmit} />
    </View>
  )
}