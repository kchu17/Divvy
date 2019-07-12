import React, { Component } from "react";
import {
	View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList,
	StatusBar, ActivityIndicator
} from "react-native";
import {
	MonoText, LText, MonoLText, BLText, XLText, BXLText, XXLText, BXXLText
} from "../components/StyledText";
import { Person, Ride } from "../components/Touchables";

const axios = require("axios");
const DB_URL = "http://ec2-18-219-137-171.us-east-2.compute.amazonaws.com:4567";

export default class MyRideScreen extends Component {
	static navigationOptions = { header: null };

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			ridePeople: []
		};
		// axios.get(`${DB_URL}/rides/rideid123`)
		// 	.then((res) => {this.setState(ridePeople: res.people);})
		// 	.catch(console.log);
	}

	componentDidMount() {
		this.setState({ loading: false });
	}

	render() {
		const header = (
			<View style={styles.header}>
				<BXXLText style={styles.headerText}>My Ride</BXXLText>
			</View>
		);

		const body = (this.state.loading ?
			<View style={styles.body}><ActivityIndicator size="large" /></View> :
			<View style={styles.body}>
				<ScrollView>
				<View>
					<BXLText>Today</BXLText>
				</View>

				{
				/*
				<TouchableOpacity style={styles.rideSummary}>
					<BLText>Scheduled time:</BLText>
					<MonoLText style={styles.timeText}>7:45 AM ~ 8:40 AM</MonoLText>
				</TouchableOpacity>
				*/
				<Ride />
				}

				<View>
					<View>
						<BLText>Real-time ETA:</BLText>
						<MonoLText style={styles.timeText}>7:50 AM ~ 8:50 AM</MonoLText>
					</View>
					<View>
						<FlatList
							ListHeaderComponent={<BLText>Progress</BLText>}
							data={[
								{
									key: "Bill",
									pickedUp: true,
									isMe: false,
									profPicUrl: "https://catking.in/wp-content/uploads/2017/02/default-profile-1.png"
								},
								{ key: "May", pickedUp: true, isMe: false },
								{ key: "Kevin", pickedUp: false, isMe: true },
								{ key: "Sam", pickedUp: false, isMe: false }
							]}
							renderItem={({item}) => (
								<Person name={item.key} pickedUp={item.pickedUp} isMe={item.isMe} showArrow={false}/>
							)}
						/>
					</View>
				</View>
				</ScrollView>
			</View>
		);

		return (
			<View style={styles.screenWrapper}>
				{header}
				{body}
			</View>
		);
	}
}


const styles = StyleSheet.create({
	screenWrapper: { flex: 1 },
		header: {
			backgroundColor: "#cccccc",
			flex: 1,
			paddingTop: StatusBar.currentHeight,
			justifyContent: "center",
			alignItems: "center"
		},
			headerText: { color: "#444444" },
		body: {
			flex: 10,
			padding: 15,
		},
			rideSummary: {
				borderStyle: "solid",
				borderWidth: 1,
				borderRadius: 10,
				padding: 10,
				margin: 20,
			},
			person: {
				borderWidth: 1,
				borderStyle: "solid",
				borderRadius: 10,
				margin: 10,
				padding: 10,
			},

	timeText: {
		textAlign: "center",
	},
});


