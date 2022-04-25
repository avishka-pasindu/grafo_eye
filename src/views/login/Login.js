import React, { useState, useContext, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { AuthContext } from '../../core/AuthProvider'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {


    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [status, setStatus] = useState();

    const { user, login, isLogged, setIsLogged } = useContext(AuthContext)



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('hey')


        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        //console.log('status 2', status)
        return unsubscribe;

    }, []);

    const getLoggedInStatus = async () => {
        try {
            let value = await AsyncStorage.getItem('login_status')
            if (value !== null) {
                console.log('loaded token ', value)
                setStatus(value)


            } else {
                console.log('no token available !')
                setStatus(null);
            }
        } catch (e) {
            console.log(e)

        }
    }
    /*  function getStatus() {
          getLoggedInStatus();
          setTimeout(() => {
              console.log('Hello, World!')
          }, 3000);
      } */

    function log() {

        // getStatus();
        if (email != null && password != null) {
            // getLoggedInStatus();

            // console.log('getting current status ', status)
            //console.log(' current status ', getLoggedInStatus.value)
            login(email, password);


            setEmail('');
            setPassword('');
            // console.log('done ', status)
            // getLoggedInStatus();

        } else {
            // getLoggedInStatus();
            console.log('entered null values !')
            //console.log('done ', status)
        }
        // console.log(isLogged)
    }



    return (
        <Background>

            <Logo />
            <Header>Welcome back</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email}
                onChangeText={(useremail) => setEmail(useremail)}
                error={''}
                errorText={''}

                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password}

                onChangeText={(userpassword) => setPassword(userpassword)}
                error={''}
                errorText={''}
                secureTextEntry
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={styles.forgot}>Forgot your password ?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={() => log()}>
                Login
            </Button>
            <View style={styles.row}>
                <Text>Don’t have an account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </Background>

    );

}

export default Login;

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})
