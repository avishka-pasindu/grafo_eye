
import React, { Fragment, Component, useState, useEffect, useContext } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View, SafeAreaView, ScrollView,
    Alert,
    Image,
    Text
} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button'
import { async } from '@firebase/util';
import { connect } from 'react-redux'
import storage, { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import TextInput from '../../components/TextInput';
import { AuthContext } from '../../core/AuthProvider';


const Report = (props, { navigation }) => {

    //const { imageUriPath } = props;

    const [imageURI, setImageURI] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)
    const [writerName, setWriterName] = useState('')
    const { user } = useContext(AuthContext)
    const { output, outputLoading, showCards } = props;

    const getImageURI = async () => {
        try {
            const value = await AsyncStorage.getItem('@imageURI');
            if (value !== null) {
                // We have data!!

                setImageURI(value)
                console.log(imageURI);
                return value
            }
        } catch (e) {
            console.log(e)
        }
    };

    const uploadImageToFirestore = async () => {

        const uploadURI = imageURI;
        let filename = uploadURI.substring(uploadURI.lastIndexOf('/') + 1);
        setUploading(true)
        setTransferred(0)
        console.log('uploading to firestore...', uploadURI)
        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadURI);

        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });

        try {
            await task;
            const url = await storageRef.getDownloadURL();
            //setUploading(false)
            console.log('uploaded to firestore sucessfully')

            return url;
        } catch (e) {
            console.log(e)
            return null;
        }

    }

    const saveProfile = async () => {
        console.log('profile saved ...')
        const imageLink = await uploadImageToFirestore();

        firestore()
            .collection('Test_DB')
            .add({
                writer: writerName,
                image: imageLink,
                user: user.email,
                outputData: output
            })
            .then(() => {
                console.log('Data added!');

                setWriterName(null)
                setImageURI(null)
                setUploading(false)
            }
            ).catch((e) => {
                console.log('Error in Data addeding! ', e);
            });

        console.log('image link ', imageLink)
        removeURI('@imageURI');


    }

    const removeURI = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log('removed', imageURI)
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            console.log('report page loaded ...')
            getImageURI();
            console.log('loaded URI ', getImageURI())


        });
        //return unsubscribe;

    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Card style={{ borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 200, width: 350, marginTop: 20, marginBottom: 10 }}>

                        <Card.Content>
                            <Title style={{ marginTop: -10, marginBottom: 10, color: '#092C4C', fontSize: 17 }}>Writer's handwriting</Title>

                        </Card.Content>
                        <Card.Cover style={{ height: 132, width: 310, marginLeft: 17 }} source={{ uri: imageURI }} />

                    </Card>
                    <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 310, width: 350 }}>

                        <Card.Content>
                            <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, }}>Extracted handwriting features</Title>
                            <Text style={{ marginTop: 2, color: '#000' }}>{'\u29BF'} Baseline - {output.baseline}</Text>
                            <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Pen pressure - {output.pen_pressure}</Text>
                            <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Letter size - {output.letter_size}</Text>
                            <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Line spacing - {output.line_spacing}</Text>
                            <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Margin left - {output.margin_left}</Text>
                            <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Margin Right - {output.margin_right}</Text>
                            <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Tittle 'i' - {output.tittle_i}</Text>
                            <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Lowercase letter 't' - {output.letter_t}</Text>
                            <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Lowercase letter 'f' - {output.letter_f}</Text>
                            <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Connected strokes - {output.connected_strokes}</Text>
                            <Text style={{ marginTop: 4, marginBottom: 4, color: '#000' }}>{'\u29BF'} Letter slant -  {output.letter_slant}</Text>
                        </Card.Content>


                    </Card>
                    <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 110, width: 350 }}>

                        <Card.Content>
                            <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, }}>Predicted personality group</Title>
                            <Text style={{ color: '#000' }}>{output.prediction}</Text>
                        </Card.Content>

                        {output.prediction == 'Neuroticism ' ? <Image source={require('../../assets/neuro.png')} style={{ width: 90, height: 90, marginTop: -55, marginLeft: 250 }} /> : null}
                        {output.prediction == 'Openness' ? <Image source={require('../../assets/open.png')} style={{ width: 90, height: 90, marginTop: -55, marginLeft: 250 }} /> : null}
                        {output.prediction == 'Agreeableness' ? <Image source={require('../../assets/agree.png')} style={{ width: 90, height: 90, marginTop: -55, marginLeft: 250 }} /> : null}
                        {output.prediction == 'Extraversion' ? <Image source={require('../../assets/extrav.png')} style={{ width: 90, height: 90, marginTop: -55, marginLeft: 250 }} /> : null}
                        {output.prediction == 'Conscientiousness' ? <Image source={require('../../assets/cons.png')} style={{ width: 90, height: 90, marginTop: -55, marginLeft: 250 }} /> : null}
                    </Card>

                    <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 200, width: 350 }}>

                        <Card.Content>
                            <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, }}>Description on predicted group</Title>
                            <Text style={{ marginTop: 7, color: '#000' }}>{output.personality_description_big_5}</Text>
                        </Card.Content>


                    </Card>
                    <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 380, width: 350 }}>

                        <Card.Content>
                            <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, }}>Description on personality traits using all handwriting features</Title>


                            {output.trait_baseline != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_baseline}</Text> : null}
                            {output.trait_connected_strokes != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_connected_strokes}</Text> : null}
                            {output.trait_letter_f != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_letter_f}</Text> : null}
                            {output.trait_letter_size != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_letter_size}</Text> : null}
                            {output.trait_letter_slant != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_letter_slant}</Text> : null}
                            {output.trait_letter_t != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_letter_t}</Text> : null}
                            {output.trait_line_spacing != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_line_spacing}</Text> : null}
                            {output.trait_margin_left != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_margin_left}</Text> : null}
                            {output.trait_margin_right != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_margin_right}</Text> : null}
                            {output.trait_pen_pressure != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_pen_pressure}</Text> : null}
                            {output.trait_tittle_i != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{output.trait_tittle_i}</Text> : null}

                        </Card.Content>


                    </Card>
                    <TextInput style={{ width: 338, marginLeft: 27, color: '#092C4C', height: 50, fontSize: 15 }}
                        label="Writer's name"
                        returnKeyType="next"
                        value={writerName}
                        onChangeText={(name) => setWriterName(name)}
                        error={''}
                        errorText={''}


                    />


                    {uploading ? <View >
                        <Text style={{ color: "#092C4C" }}>{transferred} % Completed </Text>
                        <ActivityIndicator size="large" color="#092C4C" />
                    </View> : <Button
                        //loading={loading}
                        mode="contained"
                        //onPress={() => navigation.navigate('MainBottomNavContainer')}
                        onPress={() => saveProfile()}
                        style={{ width: 340, height: 51, marginTop: 20, marginBottom: 60 }}
                    >
                        save profile
                    </Button>}

                </View>

            </ScrollView>
        </SafeAreaView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

});



function mapStateToProps(state) {
    //console.log(state)
    return {

        output: state.predictionReducer.output,
        outputLoading: state.predictionReducer.outputLoading,
        showCards: state.predictionReducer.showCards


    }

}

export default connect(mapStateToProps)(Report);

//export default Report;