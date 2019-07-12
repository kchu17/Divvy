import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';


import Logo from './Logo';
import Form from './Form';

export default class Login extends Component 
{
    render()
    {
        return(
            <View styles = {styles.container}>
               <Logo/>
               <Form/>
               <View style = {styles.signupTextCont}>
                 <View style={styles.buttonContainer}>
                 <Button
                 onPress={this._onPressButton}
                 title="Sign Up"
                 />
                 </View>
               </View>
            </View>
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
