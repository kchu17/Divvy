import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';


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
                   <Text>Sign up</Text>
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
        justifyContent: 'center'
    }
  });
