import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from './components/Login';
import Logo from './components/Logo';
import MyRide from './MyRide';
import Homepage from './Homepage';

const AppNavigator = createStackNavigator({
  Home: { screen: Homepage },
  Login: { screen: Login },
  MyRide: { screen: MyRide },
});

export default createAppContainer(AppNavigator);
