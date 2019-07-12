import { Text } from 'react-native';
import React, { Component } from "react";
import {
  View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList,
  StatusBar, ActivityIndicator, Button, Alert
} from "react-native";
import {
  MonoText, LText, MonoLText, BLText, XLText, BXLText, XXLText, BXXLText
} from "../StyledText";
import { Person, Ride } from "../Touchables";
import { AntDesign } from '@expo/vector-icons';

// const axios = require("axios");
// import { DB_URL } from "./url_key";


function alertOrDetails(props) {
  if (true) {
    Alert.alert('Group Join Request Sent', `${props.src} -> ${props.dst}, arrive at ${props.arrival}`,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false },
    );
  } else {
    props.navigation.navigate('GroupDetailsScreen')
  }
}

function SearchGroup(props) {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', ...searchGroupStyles.personWrapper}}
      onPress={() => alertOrDetails(props)}//props.navigation.navigate('GroupDetailsScreen')}
    >
      <View style={{flex: 1}}>
        <LText style={searchGroupStyles.nameText}>From</LText>
        <Text>{props.src}</Text>
      </View>

      <View style={{flex: 1}}>
        <LText style={searchGroupStyles.nameText}>To</LText>
        <Text>{props.dst}</Text>
      </View>

      <View style={{flex: 1}}>
        <LText style={searchGroupStyles.nameText}>Arrival</LText>
        <Text>{props.arrival}</Text>
      </View>
      <View style={searchGroupStyles.arrow}>
        <AntDesign name="right" size={30} color="#aaaaaa" />
      </View>
    </TouchableOpacity>
  );

}
export default class SearchForGroup extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      ridePeople: [],
      searchQuery: "IBM SVL"
    };
    // axios.get(`${DB_URL}/rides/rideid123`)
    //  .then((res) => {this.setState(ridePeople: res.people);})
    //  .catch(console.log);
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const header = (
      <View style={styles.header}>
        <BXXLText style={styles.headerText}>Searching for '{ this.state.searchQuery }'</BXXLText>
      </View>
    );

    const body = (this.state.loading ?
      <View style={styles.body}><ActivityIndicator size="large" /></View> :
      <View style={styles.body}>
        <ScrollView>
          <View>
            <FlatList
              ListHeaderComponent={<BLText>Groups Found</BLText>}
              data={[
                { key: "groupid0", id: 0, src: "IBM—SVL", dst: "Almaden", arrival: "5:00 pm" },
                { key: "groupid1", id: 1, src: "IBM—SVL", dst: "Palo Alto", arrival: "6:30 pm" },
                { key: "groupid2", id: 2, src: "IBM—SVL", dst: "Santa Clara", arrival: "5:45 pm" },
                { key: "groupid3", id: 3, dst: "IBM—SVL", src: "Willow Glen, San Jose", arrival: "9:30 am" }
              ]}
              renderItem={({item}) => (
                <SearchGroup key={item.id} {...item} navigation={this.props.navigation}/>
              )}
            />
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


const personWrapperTemplate = {
  borderWidth: 1,
  borderStyle: "solid",
  borderRadius: 10,
  margin: 10,
  padding: 10,
  flex: 1,
  flexDirection: "row",
};

const searchGroupStyles = StyleSheet.create({
  personWrapper: {
    ...personWrapperTemplate
  },
  pickedUpWrapper: {
    ...personWrapperTemplate,
    backgroundColor: "#f9c669",
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

  rideSummary: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
    rideSummaryContent: {
      flex: 10,
    },
      timeText: {
        textAlign: "center",
      },
});

