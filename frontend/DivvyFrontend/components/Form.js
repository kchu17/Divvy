import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';


export default class LoginForm extends Component 
{
    render()
    {
        return(
            <View styles = {styles.container}>
                 <TextInput style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)' placeholder = "Username"/>
                 <TextInput style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)' placeholder = "Password"/>
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

    inputBox:{
        width: 300,
        borderRadius:25
    }
  });
