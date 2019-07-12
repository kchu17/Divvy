import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LText } from "./StyledText.js"
import { AntDesign } from '@expo/vector-icons';

export class Person extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableOpacity
				style={this.props.isMe ? styles.meWrapper : styles.personWrapper}
			>
				<View style={styles.profilePictureWrapper}>
					<Image source={{uri: "https://catking.in/wp-content/uploads/2017/02/default-profile-1.png"}} style={{width: 50, height: 50}} />
				</View>
				<View style={styles.nameWrapper}>
					<LText style={styles.nameText}>{this.props.name}</LText>
              		{this.props.pickedUp ? <AntDesign style={styles.pickedUpIcon} name="checkcircleo" size={25} color="#55dd55" /> : <View />}
				</View>
				<View style={styles.arrow}>
					<AntDesign name="right" size={30} color="#aaaaaa" />
				</View>
			</TouchableOpacity>
		);
	}
}

const personWrapperTemplate = {
	borderWidth: 1,
	borderStyle: "solid",
	borderRadius: 10,
	margin: 10,
	padding: 10,
	flex: 1,
	flexDirection: "row",
};

const styles = StyleSheet.create({
	personWrapper: {
		...personWrapperTemplate
	},
	meWrapper: {
		...personWrapperTemplate,
		backgroundColor: "#f9c669",
	},
		profilePictureWrapper: {
			flex: 3,
			justifyContent: "center",
			alignItems: "center",
		},
		nameWrapper: {
			flex: 7,
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "row"
		},
			nameText: {
				flex: 1
			},
			pickedUpIcon: {
				flex: 1
			},
		arrow: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
});

