import React, { Component } from 'react';
import axios from 'axios';
import {
  TabNavigator, StackNavigator
} from 'react-navigation';
import FavoritesScreen from './src/pages/Favorites'
import MapScreen from './src/pages/Map';
import FavMapScreen from './src/pages/FavMap';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
  AsyncStorage
} from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home'
  }
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      email: '',
      password: '',
      currUser: '',
    }

    this.onLogin = this.onLogin.bind(this);
  }

  componentWillMount(){
    AsyncStorage.getItem('token', (err, value) => {
      if(value){
        this.setState({loggedIn: true, currUser: value})
      }
    })
  }

  onLogin(){
    const { navigate } = this.props.navigation;
    let data = 'email=' + this.state.email + '&' + 'password=' + this.state.password
    axios.post('http://10.30.15.75:3000/login', data)
    .then(async function(response) {
      try {
        await AsyncStorage.setItem('token', response.data, () => {
          this.setState({currUser: response.data});
        })
      } catch (error) {
          console.log(error);
      }
    })
  }

  _updateHome(){
    this.setState(this.state)
  }

  render(){
    if(!this.state.loggedIn){
      return(
        <View
          style={{
            height:400,
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
          <View
          style={{
            padding: 15,
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
            <Text>Login:</Text>
            <TextInput
              style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.text}
              autoFocus={true}
              keyboardType='email-address'
              returnKeyType='next'
            />
            <Text>Password:</Text>
            <TextInput
              style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(password) => this.setState({password})}
              value={this.state.text}
              secureTextEntry={true}
              returnKeyType='done'
            />
            <Button
              title="Login"
              onPress={this.onLogin}
            />
          </View>
        </View>
      );
    } else {
      return(
        <View
          style={{
            height:400,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
              <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={(row) => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  this.setState(this.state);
                  let mapData = 'destination=' + data.description + '&user=' + this.state.currUser;
                  axios.post('http://10.30.15.75:3000/map', mapData)
                  .then((res) => {this.props.navigation.navigate('Map', {onUpdateHome: this._updateHome.bind(this)})
                  });
                }}
                getDefaultValue={() => {
                  return ''; // text input default value
                }}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyB5GDa5558nr1BrKFxboyA5lBw-9-RiAFc',
                  language: 'en', // language of the results
                  types: 'geocode' // default: 'geocode'
                }}
                styles={{
                  textInputContainer: {
                    width: 300
                  },
                  description: {
                    fontWeight: 'bold'
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  }
                }}

                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance'
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={50} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              />
          <Button
            onPress={() => {
              AsyncStorage.clear(() => {
                this.props.navigation.navigate('Home')
              })
            }}
            title='Logout'
          />
        </View>
      )
    }
  }
}

const HomeTab = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Map: {
    screen: MapScreen,
  }},
  {
    headerMode: 'none'
  }
)

const FavTab = StackNavigator({
  Favorites: {
    screen: FavoritesScreen
  },
  FavMap: {
    screen: FavMapScreen
  }},
  {
    headerMode: 'none'
  }
)

const App = TabNavigator({
  Main: { screen: HomeTab },
  Favorites: { screen: FavTab },
}, {
  lazy: true,
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});
export default App;

