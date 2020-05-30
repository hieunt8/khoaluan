import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoading from '../AuthLoading/AuthLoading';
import LoginScreen from '../screens/LoginScreen';
import tabNavigator from './MainTabNavigator';

const AuthLoadingNavigator = createAppContainer(createSwitchNavigator({
      AuthLoading: AuthLoading,
      Login :{
        screen: LoginScreen
      },
      Menu: tabNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    },))


const authNavigator = createAppContainer(
    AuthLoadingNavigator
);
export default authNavigator;
