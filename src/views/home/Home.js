import React, { Fragment, Component, useState, useEffect } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Platform,
    SafeAreaView, ScrollView,
    Image,
    View,
    Text
} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
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
import { getPrediction, clearCurrentPrediction } from '../../store/actions/prediction'
//import { getAllAssesments } from '../../store/actions/counts';
import axios from 'axios'

const Home = (props, { navigation }) => {

    const [image, setImage] = useState(null)
    const [imageFilename, setImageFilename] = useState(null)
    const { output, outputLoading, showCards } = props;

    useEffect(() => {
        //props.getPrediction()
    }, []);

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

        });
        //console.log('filename is ', imageFilename)
    }

    function getOutput() {
        props.getPrediction(imageFilename);
        console.log('display prediction')

        /*   let config = {
               method: 'post',
               url: `http://10.0.2.2:5000/data`,
               headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
               data: {
                   filename: 'image20.png'
   
               }
           };
   
           axios(config)  //45457
               .then(data => {
                   console.log('Loaded prediction ', data.data.prediction)
   
   
               }).catch((error) => {
                   console.log("error ", error)
   
               })
   */
    }

    function clearInputs() {
        console.log('clear inputs!')
        setImage(null)
        props.clearCurrentPrediction()


    }


    const passImagePath = async () => {
        //saveImageURI(image)
        //navigation.navigate('Report')

        try {
            await AsyncStorage.setItem('@imageURI', image);
            console.log('image URI saved ...', image)
            props.navigation.navigate('Report')

        } catch (e) {
            console.log(e)
        }
    };



    return (
        <SafeAreaView>
            {image != null ?

                <ScrollView>
                    <View style={styles.container}>


                        <Image style={{ width: 350, height: 180, marginTop: 15, marginBottom: 10, borderRadius: 8, borderColor: '#092C4C', borderWidth: 2 }} source={{ uri: image }} />

                        <Button
                            //loading={loading}
                            mode="contained"
                            //onPress={() => navigation.navigate('MainBottomNavContainer')}
                            onPress={() => getOutput()}
                            style={{ width: 200, height: 50, marginLeft: 145 }}
                        >
                            Get prediction
                        </Button>

                        <Button
                            //loading={loading}
                            mode="contained"
                            //onPress={() => navigation.navigate('MainBottomNavContainer')}
                            onPress={() => clearInputs()}
                            style={{ width: 118, height: 50, marginTop: -60, marginLeft: -228 }}
                        >
                            Clear
                        </Button>

                        {outputLoading ? <ActivityIndicator size={'large'} /> :
                            <View>
                                {showCards ? <View>
                                    <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 305, width: 350 }}>

                                        <Card.Content>
                                            <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, fontWeight: 'bold', }}>Extracted handwriting features</Title>
                                            <Text style={{ marginTop: 2 }}>{'\u29BF'} Baseline - {output.baseline}</Text>
                                            <Text style={{ marginTop: 4 }}>{'\u29BF'} Pen pressure - {output.pen_pressure}</Text>
                                            <Text style={{ marginTop: 4 }}>{'\u29BF'} Letter size - {output.letter_size}</Text>
                                            <Text style={{ marginTop: 4 }}>{'\u29BF'} Line spacing - {output.line_spacing}</Text>
                                            <Text style={{ marginTop: 4 }}>{'\u29BF'} Margin left - {output.margin_left}</Text>
                                            <Text style={{ marginTop: 4 }}>{'\u29BF'} Margin Right - {output.margin_right}</Text>
                                            <Text style={{ marginTop: 4 }}>{'\u29BF'} Tittle 'i' - {output.tittle_i}</Text>
                                            <Text style={{ marginTop: 4 }}>{'\u29BF'} Lowercase letter 't' - {output.letter_t}</Text>
                                            <Text style={{ marginTop: 4 }}>{'\u29BF'} Lowercase letter 'f' - {output.letter_f}</Text>
                                            <Text style={{ marginTop: 4 }}>{'\u29BF'} Connected strokes - {output.connected_strokes}</Text>
                                            <Text style={{ marginTop: 4, marginBottom: 4 }}>{'\u29BF'} Letter slant -  {output.letter_slant}</Text>
                                        </Card.Content>


                                    </Card>
                                    <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 100, width: 350 }}>

                                        <Card.Content>
                                            <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, fontWeight: 'bold', }}>Predicted personality group</Title>
                                            <Text>{output.prediction}</Text>

                                        </Card.Content>


                                    </Card>

                                    <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 200, width: 350 }}>

                                        <Card.Content>
                                            <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, fontWeight: 'bold', }}>Description about the predicted group</Title>
                                            <Text style={{ marginTop: 7 }}>{output.personality_description_big_5}</Text>
                                        </Card.Content>


                                    </Card>


                                    <Button
                                        //loading={loading}
                                        mode="contained"
                                        //onPress={() => navigation.navigate('MainBottomNavContainer')}
                                        onPress={() => passImagePath()}
                                        style={{ width: 345, height: 50, marginBottom: 30, marginTop: 10 }}
                                    >
                                        Continue to full report
                                    </Button>
                                </View> : null}


                            </View>
                        }

                    </View>


                </ScrollView>
                :
                <View style={styles.container}>
                    <Image style={{ width: 200, height: 150, marginTop: 190, marginBottom: 10, borderRadius: 8 }} source={{ uri: 'https://res.cloudinary.com/ddyx8lon3/image/upload/v1651214282/logo-transparent_s5onei.png' }} />
                    <ActionButton buttonColor="#F2994A" style={{ marginTop: 490 }}>
                        <ActionButton.Item buttonColor='#092C4C' title="Take photo" onPress={openTheCamera}>
                            <Icon name="camera" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#092C4C' title="Choose photo" onPress={openTheGallery}>
                            <Icon name="images" style={styles.actionButtonIcon} />
                        </ActionButton.Item>

                    </ActionButton>
                </View>}

        </SafeAreaView>

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


function mapStateToProps(state) {
    // console.log(state)
    return {


        output: state.predictionReducer.output,
        outputLoading: state.predictionReducer.outputLoading,
        showCards: state.predictionReducer.showCards



    }

}

export default connect(mapStateToProps, { getPrediction, clearCurrentPrediction })(Home);
//export default Home; 