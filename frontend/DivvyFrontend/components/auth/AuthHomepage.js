import React from "react";
import { View, Text, StyleSheet, Button} from "react-native";
import Logo from '../Logo';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
});

// AppRegistry.registerComponent('App', () => App);

export default function Homepage({ navigation }) {
  return (
    <View style={styles.container}>
     <Logo/>
      <View style={styles.buttonContainer}>
        {<Button onPress={() => navigation.navigate('SignUp')} title="Sign Up"/>}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate('Login')}
          title="Login"
          color="#841584"
        />
      </View>
    </View>
  );
}