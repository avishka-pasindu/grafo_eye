import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainBottomNavContainer from './views/mainNavContainer/MainBottomNavContainer'
import { NavigationContainer } from '@react-navigation/native';
import Login from './views/login/Login';

const App_Stack = createStackNavigator();

const AppStack = () => {
    return (
        <NavigationContainer independent={true} >
            <App_Stack.Navigator screenOptions={{ headerShown: false }}>
                <App_Stack.Screen name="MainBottomNavContainer" component={MainBottomNavContainer} />
                <App_Stack.Screen name="Login" component={Login} />
            </App_Stack.Navigator>
        </NavigationContainer>


    );

}

export default AppStack;
