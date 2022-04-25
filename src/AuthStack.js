import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingUI from './views/onboardingUI/OnboardingUI';
import Login from './views/login/Login';
import SignUp from './views/signUp/SignUp'
import ResetPassword from './views/resetPassword/ResetPassword'


const AppStack = createStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer independent={true}>


            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="OnboardingUI" component={OnboardingUI} />
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="SignUp" component={SignUp} />
                <AppStack.Screen name="ResetPassword" component={ResetPassword} />
            </AppStack.Navigator>
        </NavigationContainer>
    );

}

export default AuthStack;
