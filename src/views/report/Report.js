
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


const Report = ({ navigation }, props) => {

    //const { imageUriPath } = props;

    const [imageURI, setImageURI] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)
    const [writerName, setWriterName] = useState('')
    const { user } = useContext(AuthContext)

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
                user: user.email
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
        navigation.addListener('focus', () => {
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
                    <Image style={{ width: 340, height: 180, marginTop: 20, marginBottom: 10, borderRadius: 8, borderColor: '#092C4C', borderWidth: 2 }} source={{ uri: imageURI }} />
                    <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 180, width: 350 }}>

                        <Card.Content>
                            <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, fontWeight: 'bold', }}>Extracted handwriting features</Title>

                        </Card.Content>


                    </Card>
                    <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 100, width: 350 }}>

                        <Card.Content>
                            <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, fontWeight: 'bold', }}>Predicted personality group</Title>

                        </Card.Content>


                    </Card>

                    <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 200, width: 350 }}>

                        <Card.Content>
                            <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, fontWeight: 'bold', }}>Personality traits of predicted group</Title>

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


                    {uploading ? <View>
                        <Text>{transferred} % Completed </Text>
                        <ActivityIndicator size="large" color="#092C4C" />
                    </View> : <Button
                        //loading={loading}
                        mode="contained"
                        //onPress={() => navigation.navigate('MainBottomNavContainer')}
                        onPress={() => saveProfile()}
                        style={{ width: 340, height: 51, marginTop: 20, marginBottom: 20 }}
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



/*function mapStateToProps(state) {
    console.log(state)
    return {

        imageUriPath: state.predictionReducer.imageUriPath


    }

}

export default connect(mapStateToProps)(Report);*/

export default Report;