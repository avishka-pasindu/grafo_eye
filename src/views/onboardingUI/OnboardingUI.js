import React from 'react';
import { Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


const OnboardingUI = ({ navigation }) => {
    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ width: 180, height: 180 }} source={require('../../assets/logoandname.png')} />,
                    title: '',
                    subtitle: 'Done with React Native Onboarding1',
                },
                {
                    backgroundColor: '#E3F4FF',
                    image: <Image style={{ width: 180, height: 180 }} source={require('../../assets/logo-transparent.png')} />,
                    title: 'Hi There,',
                    subtitle: 'Done with React Native Onboarding2',
                },
                {
                    backgroundColor: '#FFEEE2',
                    image: <Image style={{ width: 180, height: 180 }} source={require('../../assets/logo-transparent.png')} />,
                    title: 'Get started ...',
                    subtitle: 'Done with React Native Onboarding3',
                },
            ]}
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.navigate("Login")}
        />

    );

}

export default OnboardingUI;
