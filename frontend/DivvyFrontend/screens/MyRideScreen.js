import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

const axios = require("axios");
const DATABASE_URL = "localhost:4567";

export default class MyRideScreen extends Component {
	static navigationOptions = {
		title: "My Ride"
	};

	render() {
		const rideToday = "";
		return (
			<View>
				<Text style={styles.test}>
					this is my ride screen
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	test: {
		color: "red"
	}
});


