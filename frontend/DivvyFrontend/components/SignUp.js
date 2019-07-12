import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ScrollView} from 'react-native';

import Logo from './Logo';

export default class SignUp extends Component 
{
    render()
    {
        return(
         <ScrollView>
            <View styles = {styles.form}>
                <Logo/>
                <Text style = {styles.header}>Registration</Text>
                
                <TextInput style = {styles.textinput} placeholder = "Your name" underlineColorAndroid = {'transparent'}/>

                <TextInput style = {styles.textinput} placeholder = "Password" underlineColorAndroid = {'transparent'}/>
                
                <TextInput style = {styles.textinput} placeholder = "Phone number" underlineColorAndroid = {'transparent'}/>

                <TextInput style = {styles.textinput} placeholder = "Address" underlineColorAndroid = {'transparent'}/>

                <TextInput style = {styles.textinput} placeholder = "Work Location" underlineColorAndroid = {'transparent'}/>

                <TextInput style = {styles.textinput} placeholder = "Venmo Account" underlineColorAndroid = {'transparent'}/>

               <View style = {styles.signupTextCont}>
                 <View style={styles.buttonContainer}>
                 <Button
                 onPress={this._onPressButton}
                 title="Sign Up"
                 />
                 </View>
               </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    form:{
        alignSelf: 'stretch',
    },

    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#000',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button: {
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
