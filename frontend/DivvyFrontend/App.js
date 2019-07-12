import React from "react";
import { View, Text, StyleSheet, Button} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from './components/Login';
import Logo from './components/Logo';

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

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <Logo/>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
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

const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  },
  Login: {
    screen: Login
  }
});

export default createAppContainer(AppNavigator);
