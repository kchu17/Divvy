import React from "react";
import { View, Text, StyleSheet, Button} from "react-native";
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

export default function Homepage(props) {
  return (
    <View style={styles.container}>
     <Logo/>
      <View style={styles.buttonContainer}>
        {/*<Button onPress={} title="Sign Up"/>*/}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => props.navigation.navigate('Login')}
          title="Login"
          color="#841584"
        />
      </View>
    </View>
  );
}