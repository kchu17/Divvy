import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput,TouchableOpacity} from 'react-native';



export default class Form extends Component 
{
    render()
    {
        return(
            <View styles = {styles.container}>
                 <TextInput style = {styles.inputBox} underlineColorAndroid = 'transparent' placeholder = "Username"/>
                 <TextInput style = {styles.inputBox} underlineColorAndroid = 'transparent' placeholder = "Password"/>
                 <TouchableOpacity style = {styles.button}>
                     <Text style = {styles.buttonText}>{this.props.type}</Text>
                 </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     margin: 30,
    },
    inputBox:{
        width: 300,
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        fontSize: 16, 
        color: '#ffffff',
        borderColor: 'black',
        marginVertical: 10
    },
    // button:
    // {
    //     width: 300,
    //     backgroundColor: '#1c313a',
    //     borderRadius: 25,
    //     marginVertical: 10, 
    //     paddingVertical: 13
    // }
  });
