# Would You Rather Project

React 'Mobile Flashcards' project submission for Thomas Portwood

To start:

* install all project dependencies with `yarn install`
* start the development server with `yarn start`

## Component Hierarchy
```bash
App # organizes views in stack navigation, requests notification permission
  - Decks # displays all decks as cards, navigates to individual deck view 
  - IndividualDeck # displays information about an individual deck, navigates to quiz view or new question view 
  - NewDeck # allows creation of new flashcard deck 
  - NewQuestion # allows creation of new question in an individual flashcard deck 
  - Quiz # steps through each flashcard in an individual deck, displays results on quiz completion, clears notifications and schedules next notification on quiz completion
```