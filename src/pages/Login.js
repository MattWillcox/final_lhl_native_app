// import React, { Component } from 'react';
// import axios from 'axios';

// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   ScrollView,
//   Button
// } from 'react-native';

// export default class Login extends React.Component {
//     static navigationOptions = {
//     title: 'Login',
//   };
//   constructor(props){
//     super(props)
//     this.state = {
//       loggedIn: false,
//       email: '',
//       password: '',
//       loggedInUser: ''
//     }

//     this.onLogin = this.onLogin.bind(this);
//   }

//   onLogin(){
//     let data = 'email=' + this.state.email + '&' + 'password=' + this.state.password
//     axios.post('http://10.30.15.75:3000/login', data)
//     .then((response) => {
//       this.setState({loggedInUser: response.data})
//       console.log(this.state.loggedInUser);
//       navigate('Filters')
//     })
//   }

//   render(){
//     const { navigate } = this.props.navigation;
//     return(
//       <View
//       style={{
//         padding: 15,
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}>
//         <Text>Login:</Text>
//         <TextInput
//           style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
//           onChangeText={(email) => this.setState({email})}
//           value={this.state.text}
//           autoFocus={true}
//           keyboardType='email-address'
//           returnKeyType='next'
//         />
//         <Text>Password:</Text>
//         <TextInput
//           style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
//           onChangeText={(password) => this.setState({password})}
//           value={this.state.text}
//           secureTextEntry={true}
//           returnKeyType='done'
//         />
//         <Button
//           title="Login"
//           onPress={this.onLogin}
//         />
//       </View>
//     );
//   }
// }

