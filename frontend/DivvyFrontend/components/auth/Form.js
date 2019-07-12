import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput,TouchableOpacity} from 'react-native';



export default class Form extends Component {
    state = {
        username: '',
        password: ''
    };

    getUsername = () => {
        return this.state.username;
    };

    render()
    {
        return(
            <View styles = {styles.container}>
                 <TextInput 
                    style={styles.inputBox} 
                    value={this.state.username} 
                    onChange={event => this.setState({ username: event.nativeEvent.text })}
                    underlineColorAndroid = 'transparent' 
                    placeholder = "Username"/>
                 <TextInput 
                    style = {styles.inputBox} 
                    value={this.state.password} 
                    onChange={event => this.setState({ password: event.target.value })}
                    underlineColorAndroid = 'transparent' 
                    placeholder = "Password"/>
                 <TouchableOpacity style = {styles.button}>
                     <Text style = {styles.buttonText}>{this.props.type}</Text>
                 </TouchableOpacity>
            </View>
        );
    }
}

// export default class Form extends Component 
// {
//     render()
//     {
//         return(
//         <View style={styles.container}>
//             <View style={styles.container}>
//                 <TextInput style = {styles.container} underlineColorAndroid = 'transparent' placeholder = "Username"/>
//             </View>
//             <View style={styles.container}>
//                 <TextInput style = {styles.container} underlineColorAndroid = 'transparent' placeholder = "Password"/>
//             </View>
//             <TouchableOpacity style = {styles.button}>
//                       <Text style = {styles.buttonText}>{this.props.type}</Text>
//             </TouchableOpacity>
//         </View>
//         );
//     }
// }

const styles = StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'flex-end',
     margin: 30,
    },
    inputBox:{
        width: 300,
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        fontSize: 16, 
        color: '#000000',
        borderColor: 'black',
        marginVertical: 25,
        marginHorizontal: 50,
        justifyContent: 'flex-end'
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
