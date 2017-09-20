import React from 'react'
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flexFavoritesContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  flexFavoritesChild: {
    flex: 1,
    padding: 5
  },
  textChild: {
    padding: 5, fontSize: 15,
    fontFamily: 'sans-serif-medium'
  },
  viewOnMap: {
    backgroundColor: 'steelblue',
    width: 100,
    alignSelf: 'flex-end'
  },
  textHeader: {
    fontSize: 20,
    fontFamily: 'sans-serif-medium',
    padding: 5
  }
})

export default styles
