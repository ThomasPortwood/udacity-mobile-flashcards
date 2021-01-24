import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'STORAGE_KEY'

const data = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export async function getDecks() {
  try {
    let json = await AsyncStorage.getItem(STORAGE_KEY)
    if (!json) {
      console.log('init data')
      json = await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
    return JSON.parse(json)
  } catch (e) {
    console.warn('Error getting decks', e)
  }
}

export async function getDeck(id) {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY)
    return json != null ? JSON.parse(json)[id] : null;
  } catch (e) {
    console.warn('Error getting deck', e)
  }
}

export async function saveDeck(deck) {
  try {
    const toMerge = JSON.stringify({ [deck.title]: deck })
    const merged = await AsyncStorage.mergeItem(STORAGE_KEY, toMerge)
    return JSON.parse(merged)
  }
  catch (e) {
    console.warn('Error saving new deck', e)
  }
}

export async function addCardToDeck(title, card) {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY)
    const decks = JSON.parse(json)
    const toMerge = JSON.stringify({
      [title]: {
        questions: [...decks[title].questions, card]
      }
    })
    const merged = await AsyncStorage.mergeItem(STORAGE_KEY, toMerge)
    return JSON.parse(merged)
  }
  catch (e) {
    console.warn('Error saving card to deck', e)
  }
}

export async function removeDeck(title) {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY)
    const decks = JSON.parse(json)
    delete decks[title]
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
  }
  catch (e) {
    console.warn('Error removinging deck', e)
  }
}

export async function resetAllDecks() {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({}))
  }
  catch (e) {
    console.warn('Error resetting all decks', e)
  }
}
