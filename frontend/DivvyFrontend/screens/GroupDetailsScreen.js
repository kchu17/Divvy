import React, { Component } from "react";
import {
	View, ScrollView, ActivityIndicator, FlatList, Text, StyleSheet, Button
} from "react-native";
import { BXXLText, BXLText } from "../components/StyledText";
import { Person } from "../components/Touchables.js";
import { styles as tabScreenStyles } from "./TabScreenStyles";

export default class GroupDetailsScreen extends Component {
	static navigationOptions = { header: null };

	constructor(props) {
		super(props);
		this.state = { loading: true };
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
					key: "Another Person",
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
					key: "Kevim",
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

