import React from 'react'
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flexFavoritesContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  flexFavoritesChild: {
    flex: 1,
    marginLeft: 5
  },
  textChild: {
    fontSize: 16,
    marginLeft: 15,
    color: 'steelblue'
  },
  viewOnMap: {
    backgroundColor: 'steelblue',
    width: 95,
    height: 25,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 5
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'steelblue',
    textDecorationLine: 'underline'
  }
})

export default styles
