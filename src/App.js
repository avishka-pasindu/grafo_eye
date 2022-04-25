import React from 'react';
import { AuthProvider } from './core/AuthProvider';
import Routes from './Routes';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingUI from './views/onboardingUI/OnboardingUI';
import Login from './views/login/Login';
import SignUp from './views/signUp/SignUp'
import ResetPassword from './views/resetPassword/ResetPassword'
import MainBottomNavContainer from './views/mainNavContainer/MainBottomNavContainer'

const App = ({ navigation }) => {
    const AppStack = createStackNavigator();
    return (
        <AuthProvider>
            <Routes />

        </AuthProvider>


    );

}

export default App;
