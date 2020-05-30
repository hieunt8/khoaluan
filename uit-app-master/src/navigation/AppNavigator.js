import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import tabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
// import authNavigator from './authNavigator'
import Loading from '../loading/Loading'

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Login :{
      screen: LoginScreen
    },
    Menu: tabNavigator,
    Logout: {
      screen: LoginScreen
    },
    Loading: Loading
  },
 ), 
  
);
