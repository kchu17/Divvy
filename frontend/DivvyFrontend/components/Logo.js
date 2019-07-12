import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


export default class Logo extends Component 
{
    render()
    {
        return(
            <View styles = {styles.container}>
                 <Image source = {require('./logo.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     // flexGrow: 1
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     width: 300,
     height: 400
    },
  });

