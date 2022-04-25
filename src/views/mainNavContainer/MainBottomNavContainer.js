import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, StyleSheet } from 'react-native'
// Screens
import Home from '../home/Home';
import Instructions from '../instructions/Instructions';
import Profile from '../profile/Profile';
import Report from '../report/Report';
import SelectedProfile from '../selectedProfile/SelectedProfile';

//Screen names
const homeName = "Prediction";
const instructions = "Solutions";
const profile = "Account";
const report = "Report";

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (

        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'ios-analytics' : 'ios-analytics-outline';

                    } else if (rn === instructions) {
                        iconName = focused ? 'bulb' : 'bulb-outline';

                    } else if (rn === profile) {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    }

                    else if (rn === report) {
                        iconName = focused ? 'document-text' : 'document-text-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={22} color={color} />;


                },
                headerShown: true,
                headerTintColor: '#F2994A',
                // headerLeft: <Image style={{ width: 50, height: 50 }} source={require('../../assets/logo.png')} />,

                headerStatusBarHeight: -10,
                headerStyle: { backgroundColor: '#092C4C' },

                headerTitleAlign: 'center',
                //headerShadowVisible: true,
                tabBarInactiveTintColor: '#Fff',
                tabBarActiveTintColor: '#F2994A',


                tabBarLabelStyle: { paddingBottom: 9, fontSize: 12, fontWeight: 'bold' },
                tabBarStyle: { padding: 0, height: 65, backgroundColor: '#092C4C' }

            })}

        >

            <Tab.Screen name={homeName} component={Home} />
            <Tab.Screen name={report} component={Report} />
            <Tab.Screen name={instructions} component={Instructions} />
            <Tab.Screen name={profile} component={Profile} />


        </Tab.Navigator>

    );
}

export default MainContainer;
