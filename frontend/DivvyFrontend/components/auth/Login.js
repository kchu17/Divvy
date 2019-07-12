import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Logo from '../Logo';
import Form from './Form';
import MyRide from '../../MyRide.js'
import { info } from '../../hacky.js'

export default class Login extends Component {
  formRef = React.createRef();
  render() {
    return(
      <ScrollView>
        <View styles = {styles.container}>
           <View style = {styles.signupTextCont}>
           <Logo/>
           </View>
           <Form ref={this.formRef}/>
           <View style = {styles.signupTextCont}>
             <View style={styles.buttonContainer}>
             <Button
             onPress={() => {
                info.username = this.formRef.current.getUsername();
                // navigation.popToTop();
                this.props.navigation.navigate('MyRide')
              }}
             title="Log In"
             />
             </View>
           </View>
        </View>
      </ScrollView>
    );
  }
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
