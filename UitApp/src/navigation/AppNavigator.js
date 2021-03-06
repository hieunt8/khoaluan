import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import tabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
// import authNavigator from './authNavigator'
import Loading from '../loading/Loading';
import GroupAddLoading from '../loading/GroupAddLoading'
import GroupRemoveLoading from '../loading/GroupRemoveLoading'
import GroupUpdateLoading from '../loading/GroupUpdateLoading'

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Login: {
      screen: LoginScreen
    },
    Menu: tabNavigator,
    Logout: {
      screen: LoginScreen
    },
    Loading: Loading,
    GroupAddLoading: GroupAddLoading,
    GroupRemoveLoading: GroupRemoveLoading,
    GroupUpdateLoading: GroupUpdateLoading
  },
  ),

);
