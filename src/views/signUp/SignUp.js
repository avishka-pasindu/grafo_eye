import React, { useContext, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { AuthContext } from '../../core/AuthProvider'


const SignUp = ({ navigation }) => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { register } = useContext(AuthContext)

    function signup() {

        if (name != null && email != null && password != null) {
            register(email, password);
            console.log('signed in ...');
            //navigation.navigate('MainBottomNavContainer');
            console.log('done', email, password)
            setName('');
            setEmail('');
            setPassword('');
        } else {
            console.log('entered null values !')
        }
    }

    return (

        <Background>

            <Logo />
            <Header>Create Account</Header>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name}
                onChangeText={(username) => setName(username)}
                error={''}
                errorText={''}
            />
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
            <Button
                //loading={loading}
                mode="contained"
                //onPress={() => navigation.navigate('MainBottomNavContainer')}
                onPress={() => signup()}
                style={{ marginTop: 24 }}
            >
                Sign Up
            </Button>
            <View style={styles.row}>
                <Text>Already have an account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}> Login</Text>
                </TouchableOpacity>
            </View>

        </Background>
    );

}

export default SignUp;


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})
