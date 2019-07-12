import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Logo from '../Logo';
import Form from './Form';
import Schedule from '../Schedule';
import MyRide from '../../MyRide.js'

export default function Login({ navigation }) {
  return(
      <View styles = {styles.container}>
         <Logo/>
         <Form/>
         <View style = {styles.signupTextCont}>
           <View style={styles.buttonContainer}>
           <Button
           onPress={() => {
              // navigation.popToTop();
              navigation.navigate('MyRide')
            }}
           title="Log In"
           />
           </View>
         </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center'
    },
    signupTextCont:
    {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    buttonContainer: {
        margin: 20
    }
  });

  // const AppNavigator = createStackNavigator({
  //   Schedule: {
  //     screen: Schedule
  //   }
  // });
  
  // export default createAppContainer(AppNavigator);