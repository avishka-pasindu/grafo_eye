import React, { useState } from 'react'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'




const ResetPassword = ({ navigation }) => {
    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Reset Password</Header>
            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={''}
                // onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={''}
                errorText={''}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="You will receive an email with password reset link."
            />
            <Button
                //loading={loading}
                mode="contained"
                //onPress={sendResetPasswordEmail}
                style={{ marginTop: 16 }}
            >
                Send Instructions
            </Button>

        </Background>

    );

}

export default ResetPassword;
