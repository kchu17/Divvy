import React, { Component } from "react";
import {
	View, ScrollView, ActivityIndicator, FlatList, Text, StyleSheet, Button,
	Alert
} from "react-native";
import { BXXLText, BXLText } from "../components/StyledText";
import { Person } from "../components/Touchables.js";
import { styles as tabScreenStyles } from "./TabScreenStyles";

export default class GroupDetailsScreen extends Component {
	static navigationOptions = { header: null };

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			joinRequests: [],
		};
	}

	componentDidMount() {
		// load group details from db
		this.setState({
			groupName: "Billard",
			joinRequests: [
				{
					key: "Matt",
					isMe: false,
				},
				{
					key: "George",
					isMe: false,
				},
				{
					key: "Lucas",
					isMe: false,
				},
			],
			amAdmin: true,
			members: [
				{
					key: "Sam",
					isMe: false,
				},
				{
					key: "Tom",
					isMe: true,
				},
				{
					key: "Kevin",
					isMe: false,
				},
				{
					key: "Ryan",
					isMe: false,
				},
			],
		});
		// ideally replace above with api calls
		this.setState({ loading: false });
	}

	componentDidUpdate(prevProps, prevState) {
		// this really shouldn't be here
		// rather, this should be checked continuously throughout the application
		const oldJR = prevState.joinRequests;
		const newJR = this.state.joinRequests;
		const diff = newJR.filter((jr) => oldJR.indexOf(jr) === -1);
		if (diff.length > 0) {
			Alert.alert(
				"New Join Request" + ((diff.length > 1) ? "s" : ""),
				((diff.length > 1 ? diff.slice(0, -1).map((x) => x.key).join(", ") + ` and ${diff[diff.length - 1].key} want` : `${diff[0].key} wants`)) + ` to join ${this.state.groupName}!`,
				[
					{
						text: "Details",
						onPress: () => console.log("navigate to group details screen"),
					},
					{
						text: "Accept all",
						onPress: () => this.handleAccepts(diff),
					},
					{
						text: "Decline all",
						onPress: () => this.handleDeclines(diff),
					},
				],
				{ cancelable: true }
			);
		}
	}

	handleAccepts(items) {
		// do API call here
		// POST, expect a json with newest group info, whether success or not
		let joinRequests = this.state.joinRequests;
		items.forEach((x) => { joinRequests = joinRequests.filter((y) => y.key !== x.key) });
		items.forEach((item) => this.state.members.push(item));
		this.setState({ joinRequests });
	}

	handleDeclines(items) {
		// do API call here
		// POST, expect a json with newest group info, whether success or not
		let joinRequests = this.state.joinRequests;
		items.forEach((x) => { joinRequests = joinRequests.filter((y) => y.key !== x.key) });
		this.setState({ joinRequests });
	}

	handleAccept(item) {
		// do API call here
		// POST, expect a json with newest group info, whether success or not
		const joinRequests = this.state.joinRequests.filter((x) => x.key !== item.key);
		this.state.members.push(item);
		this.setState({ joinRequests });
	}

	handleDecline(item) {
		// do API call here
		// POST, expect a json with newest group info, whether success or not
		const joinRequests = this.state.joinRequests.filter((x) => x.key !== item.key);
		this.setState({ joinRequests });
	}


	render() {
		const header = (
			<View style={styles.header}>
				<BXXLText style={styles.headerText}>{this.state.groupName}</BXXLText>
			</View>
		);
		const body = (
			this.state.loading ?
				<View style={styles.body}><ActivityIndicator size="large"/></View> :
				<View style={styles.body}>
					<ScrollView>
						{
							(this.state.joinRequests.length > 0) ?
								<FlatList
									ListHeaderComponent={<BXLText>Join Requests</BXLText>}
									data={this.state.joinRequests}
									renderItem={({item}) => (
										<View>
											<Person name={item.key} />
											{
												this.state.amAdmin ?
													<View style={styles.joinRequestButtonsWrapper}>
														<Button
															onPress={() => this.handleAccept(item)}
															title="Accept"
															style={styles.joinRequestButton}
															color="green"
														/>
														<Button
															onPress={() => this.handleDecline(item)}
															title="Decline"
															style={styles.joinRequestButton}
															color="#dd0000"
														/>
													</View> :
													<View />
											}
										</View>
									)}
								/> :
								<View />
						}
						<FlatList
							ListHeaderComponent={<BXLText>Members</BXLText>}
							data={this.state.members}
							renderItem={({item}) => (
								<Person name={item.key} isMe={item.isMe} />
							)}
						/>
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

const styles = {
	...tabScreenStyles,
	...StyleSheet.create({
		joinRequestButtonsWrapper: {
			flex: 1,
			flexDirection: "row",
			justifyContent: "space-evenly",
			alignItems: "center",
		},
			joinRequestButton: {
				flex: 1,
			},
	}),
};

