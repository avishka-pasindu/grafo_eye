import React, { Fragment, Component, useState, useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, ActivityIndicator } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingUI from './views/onboardingUI/OnboardingUI';
import Login from './views/login/Login';
import SignUp from './views/signUp/SignUp'
import ResetPassword from './views/resetPassword/ResetPassword'
import MainBottomNavContainer from './views/mainNavContainer/MainBottomNavContainer'
import auth from '@react-native-firebase/auth';
import { LogBox } from 'react-native';
import { AuthContext } from './core/AuthProvider';
import AuthStack from './AuthStack'
import AppStak from './AppStack'



LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
    "Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details."
]);
const AppStack = createStackNavigator();

const Routes = ({ navigation }) => {

    const { user, setUser, isLogged, setIsLogged } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    { user ? console.log('in') : console.log('out') }

    return (
        <NavigationContainer independent={true}>
            {user ? <AppStak /> : <AuthStack />}
        </NavigationContainer>

    );

}

export default Routes;
