import React from 'react';
import { Image, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


const OnboardingUI = ({ navigation }) => {
    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ width: 160, height: 160 }} source={require('../../assets/logoandname.png')} />,
                    title: 'Welcome !',
                    subtitle: 'Grafo Eye is a mobile application for checking your Big Five personality group and identifying personality traits.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ width: 310, height: 250 }} source={require('../../assets/homebanner-removebg-preview.png')} />,
                    title: 'Check',
                    subtitle: 'Your Big Five personality group and associated personality traits',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ width: 300, height: 240 }} source={require('../../assets/onbrd-removebg-preview.png')} />,
                    title: 'Identify',
                    subtitle: 'Your personality traits and develop them.',
                },
            ]}
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.navigate("Login")}
        />

    );

}

export default OnboardingUI;
