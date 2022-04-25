import React, { Fragment, Component, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Platform,
    Image,
    View,
    Text
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../../components/Button'
import { async } from '@firebase/util';
import storage, { firebase } from '@react-native-firebase/storage';
import Report from '../report/Report'
//import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
//import { saveImageURI } from '../../store/actions/prediction'

const Home = ({ navigation }, props) => {

    const [image, setImage] = useState(null)
    const [imageFilename, setImageFilename] = useState(null)




    const openTheCamera = () => {
        console.log('open cam')
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
            console.log(image);
        });
    }

    const openTheGallery = () => {
        console.log('open gallery')
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
            console.log(imageUri);
            setImageFilename(imageUri.substring(imageUri.lastIndexOf('/') + 1))
            console.log('filename is ', imageFilename)
        });
    }

    const getPrediction = () => {
        console.log('display prediction')
        //uploadImageToFirestore();
    }



    const passImagePath = async () => {
        //saveImageURI(image)
        navigation.navigate('Report')

        try {
            await AsyncStorage.setItem('@imageURI', image);
            console.log('image URI saved ...', image)
            navigation.navigate('Report')

        } catch (e) {
            console.log(e)
        }
    };

    return (
        <View style={styles.container}>

            {image != null
                ?
                <Image style={{ width: 340, height: 180, marginTop: -260, marginBottom: 10, borderRadius: 8, borderColor: '#092C4C', borderWidth: 2 }} source={{ uri: image }} />
                :
                <Image style={{ width: 340, height: 180, marginTop: -260, marginBottom: 10, borderRadius: 8, borderColor: '#092C4C', borderWidth: 2 }} source={{ uri: null }} />}
            <ActionButton buttonColor="#F2994A">
                <ActionButton.Item buttonColor='#092C4C' title="Take photo" onPress={openTheCamera}>
                    <Icon name="camera" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#092C4C' title="Choose photo" onPress={openTheGallery}>
                    <Icon name="images" style={styles.actionButtonIcon} />
                </ActionButton.Item>

            </ActionButton>



            <Button
                //loading={loading}
                mode="contained"
                //onPress={() => navigation.navigate('MainBottomNavContainer')}
                onPress={() => getPrediction()}
                style={{ width: 170, height: 51 }}
            >
                Get prediction
            </Button>
            <Button
                //loading={loading}
                mode="contained"
                //onPress={() => navigation.navigate('MainBottomNavContainer')}
                onPress={() => passImagePath()}
                style={{ width: 170, height: 51, marginTop: 0 }}
            >
                View report
            </Button>

        </View>

    );

}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 24,
        color: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerButtonset: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: 'red'
    }
});

/*
function mapStateToProps(state) {
    console.log(state)
    return {

        URI: state.predictionReducer.imageUriPath


    }

}

export default connect(mapStateToProps, { saveImageURI })(Home); */
export default Home; 