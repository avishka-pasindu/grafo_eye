import React, { createContext, useState } from "react";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState();

    //const navigation = useNavigation();

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLogged,
                setIsLogged,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);

                        // navigation.navigate('MainBottomNavContainer');
                        console.log('logged in successfully ...', auth().signInWithEmailAndPassword(email, password))

                    } catch (e) {
                        console.log(e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                        console.log('signed up successfully ...')
                    } catch (e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                        //navigation.navigate('Login');
                        setIsLogged(0)


                        //console.log('Done.')

                        console.log('logged out successfully ...')
                    } catch (e) {
                        console.log(e);
                    }
                    //navigation.navigate('Login')
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}