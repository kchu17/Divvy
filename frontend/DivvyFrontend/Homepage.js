import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import React from "react";
import { View, Text, StyleSheet, Button} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Logo from './Components/Logo';


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

// AppRegistry.registerComponent('App', () => App);

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('SignUp')}
            title="Sign Up"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button

            onPress={() => this.props.navigation.navigate('Login')}
            title="Login"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}


//Add to navigation
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  }

});

export default createAppContainer(AppNavigator);

// import { AppLoading } from 'expo';
// import { Asset } from 'expo-asset';
// import * as Font from 'expo-font';
// import React, { useState } from 'react';
// import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// import AppNavigator from './navigation/AppNavigator';

// export default function App(props) {
//   const [isLoadingComplete, setLoadingComplete] = useState(false);

//   if (!isLoadingComplete && !props.skipLoadingScreen) {
//     return (
//       <AppLoading
//         startAsync={loadResourcesAsync}
//         onError={handleLoadingError}
//         onFinish={() => handleFinishLoading(setLoadingComplete)}
//       />
//     );
//   } else {
//     return (
//       <View style={styles.container}>
//         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//         <AppNavigator />
//       </View>
//     );
//   }
// }

// async function loadResourcesAsync() {
//   await Promise.all([
//     Asset.loadAsync([
//       require('./assets/images/robot-dev.png'),
//       require('./assets/images/robot-prod.png'),
//     ]),
//     Font.loadAsync({
//       // This is the font that we are using for our tab bar
//       ...Ionicons.font,
//       // We include SpaceMono because we use it in HomeScreen.js. Feel free to
//       // remove this if you are not using it in your app
//       'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
//     }),
//   ]);
// }

// function handleLoadingError(error: Error) {
//   // In this case, you might want to report the error to your error reporting
//   // service, for example Sentry
//   console.warn(error);
// }

// function handleFinishLoading(setLoadingComplete) {
//   setLoadingComplete(true);
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });