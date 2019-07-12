import { createStackNavigator, createAppContainer } from "react-navigation";
import Logo from './components/Logo';
import MyRide from './MyRide';
import AuthHomepage from './components/auth/AuthHomepage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import SearchForGroup from './components/hacks/SearchForGroup';

const AppNavigator = createStackNavigator({
  Home: { screen: AuthHomepage},
  PostAuthHomepage: { screen: MyRide },
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  MyRide: { screen: MyRide },
});

export default createAppContainer(AppNavigator);
