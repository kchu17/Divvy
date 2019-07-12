import { StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
	screenWrapper: { flex: 1 },
		header: {
			backgroundColor: "#cccccc",
			flex: 1,
			paddingTop: StatusBar.currentHeight,
			justifyContent: "center",
			alignItems: "center",
		},
			headerText: { color: "#444444" },

		body: {
			flex: 10,
			paddingLeft: 15,
			paddingRight: 15,
		},
});

