import { createStackNavigator, createAppContainer } from "react-navigation";

import MyRide from './MyRide';
import AuthHomepage from './components/auth/AuthHomepage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import SearchForGroup from './components/hacks/SearchForGroup';
import GroupDetailsScreen from './screens/GroupDetailsScreen';

const AppNavigator = createStackNavigator({
  Home: { screen: SearchForGroup/*AuthHomepage*/},
  PostAuthHomepage: { screen: MyRide },
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  MyRide: { screen: MyRide },
<<<<<<< HEAD
  SearchForGroup: { screen: SearchForGroup}
=======
  GroupDetailsScreen: { screen: GroupDetailsScreen },
>>>>>>> 818b5ace1c8bb2a47887a386f66376d7de69590e
});

export default createAppContainer(AppNavigator);
