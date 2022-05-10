
import React, { Fragment, Component, useState, useContext, useEffect } from 'react';
import ButtonComponent from '../../components/Button'
import BackButton from '../../components/BackButton'
import {
    ActivityIndicator,
    StyleSheet,
    SafeAreaView, ScrollView, Image,
    View,
    Text
} from 'react-native';
import { AuthContext } from '../../core/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from '@firebase/util';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message'

const Profile = ({ navigation }, props) => {
    const { user, logout, setUser } = useContext(AuthContext)
    const [loadingProfiles, setLoadingProfiles] = useState(true)
    const [loadSingleProfile, setLoadSingleProfile] = useState(true)
    const [singleProfile, setSingleProfile] = useState(null)
    const [profiles, setProfiles] = useState(null)
    const [deleted, setDeleted] = useState(false);
    const [viewState, setViewState] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('profile page loaded ...')
            loadSavedProfiles();

        });
        // return setViewState(false);

    }, []);

    useEffect(() => {
        loadSavedProfiles();
        setDeleted(false);
    }, [deleted]);




    const loadSavedProfiles = async () => {
        try {

            const profileList = [];
            await firestore()
                .collection('Test_DB')
                .where('user', '==', user.email)
                .get()
                .then((querySnapshot) => {
                    console.log('Total profiles available ', querySnapshot.size);

                    querySnapshot.forEach(doc => {
                        const { image, user, writer, outputData } = doc.data();
                        profileList.push({
                            id: doc.id,
                            writerName: writer,
                            handwritingImage: image,
                            outputResult: outputData


                        });
                    })
                })
            setProfiles(profileList)
            if (loadingProfiles) {
                setLoadingProfiles(false)

            }
            console.log('Posts ', profileList)

            // setProfiles(profileList)
        } catch (e) {
            console.log(e)
        }
        console.log('data fetched ...', loadingProfiles)

    }

    function loggedOut() {
        logout();
        // removeToken();
        console.log('logged out !', user);
        // navigation.navigate('Login', { screen: 'Login' });
        //navigation.navigate('Login');
        console.log('done')

    }

    function viewSavedProfile(id) {

        console.log('view saved profile of ', id);
        loadSelectedProfile(id);
        setViewState(true)



    }

    const loadSelectedProfile = async (docID) => {
        try {

            const singleProf = [];
            await firestore()
                .collection('Test_DB')
                .where('user', '==', user.email)
                .get()
                .then((querySnapshot) => {
                    console.log('Total profiles available ', querySnapshot.size);

                    querySnapshot.forEach(doc => {
                        const { image, user, writer, outputData } = doc.data();
                        if (docID == doc.id) {
                            console.log('data added to single ptofile list...')
                            singleProf.push({
                                id: doc.id,
                                writerName: writer,
                                handwritingImage: image,
                                outputResult: outputData


                            });
                        }

                    })
                })
            setSingleProfile(singleProf)
            if (loadSelectedProfile) {
                setLoadSingleProfile(false)

            }
            console.log('Posts ', singleProf)

            // setProfiles(profileList)
        } catch (e) {
            console.log(e)
        }
        console.log('data fetched ...')

    }

    function backToLoadedProfiles() {
        console.log('closing current viewing profile ...')
        setViewState(false)
    }

    function deleteProfile(id) {

        console.log('profile deleted !', id);
        Toast.show({
            type: 'success',
            position: 'top',
            visibilityTime: 7000,
            text1: 'Hello',
            text2: 'This is some something ?'
        })
        firestore()
            .collection('Test_DB')
            .doc(id)
            .delete()
            .then(() => {
                console.log('post deleted ! ', id)
                setDeleted(true);
            })
            .catch((e) => console.log('Error deleting posst.', e));


    }



    return (

        <SafeAreaView>

            {singleProfile != null && viewState === true ?
                <ScrollView>
                    <View style={styles.container}>

                        <View>
                            <Card style={{ borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 200, width: 350, marginTop: 10, marginBottom: 10 }}>

                                <Card.Content>
                                    <Title style={{ marginTop: -10, marginBottom: 10, color: '#092C4C', fontSize: 17 }}>{singleProfile[0].writerName}'s handwriting sample</Title>

                                </Card.Content>
                                <Card.Cover style={{ height: 132, width: 310, marginLeft: 17 }} source={{ uri: singleProfile[0].handwritingImage }} />

                            </Card>
                            <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 310, width: 350 }}>

                                <Card.Content>
                                    <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, }}>Extracted handwriting features</Title>
                                    <Text style={{ marginTop: 2, color: '#000' }}>{'\u29BF'} Baseline - {singleProfile[0].outputResult.baseline}</Text>
                                    <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Pen pressure - {singleProfile[0].outputResult.pen_pressure}</Text>
                                    <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Letter size - {singleProfile[0].outputResult.letter_size}</Text>
                                    <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Line spacing - {singleProfile[0].outputResult.line_spacing}</Text>
                                    <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Margin left - {singleProfile[0].outputResult.margin_left}</Text>
                                    <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Margin Right - {singleProfile[0].outputResult.margin_right}</Text>
                                    <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Tittle 'i' - {singleProfile[0].outputResult.tittle_i}</Text>
                                    <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Lowercase letter 't' - {singleProfile[0].outputResult.letter_t}</Text>
                                    <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Lowercase letter 'f' - {singleProfile[0].outputResult.letter_f}</Text>
                                    <Text style={{ marginTop: 4, color: '#000' }}>{'\u29BF'} Connected strokes - {singleProfile[0].outputResult.connected_strokes}</Text>
                                    <Text style={{ marginTop: 4, marginBottom: 4, color: '#000' }}>{'\u29BF'} Letter slant -  {singleProfile[0].outputResult.letter_slant}</Text>
                                </Card.Content>


                            </Card>
                            <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 100, width: 350 }}>

                                <Card.Content>
                                    <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, }}>Predicted personality group</Title>
                                    <Text style={{ color: '#000' }}>{singleProfile[0].outputResult.prediction}</Text>
                                </Card.Content>


                            </Card>
                            <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 200, width: 350 }}>

                                <Card.Content>
                                    <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, }}>Description on predicted group</Title>
                                    <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.personality_description_big_5}</Text>
                                </Card.Content>


                            </Card>
                            <Card style={{ marginTop: 10, marginBottom: 10, borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 380, width: 350 }}>

                                <Card.Content>
                                    <Title style={{ marginTop: -10, marginBottom: 0, color: '#092C4C', fontSize: 17, }}>Description on personality traits using all handwriting features</Title>


                                    {singleProfile[0].outputResult.trait_baseline != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_baseline}</Text> : null}
                                    {singleProfile[0].outputResult.trait_connected_strokes != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_connected_strokes}</Text> : null}
                                    {singleProfile[0].outputResult.trait_letter_f != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_letter_f}</Text> : null}
                                    {singleProfile[0].outputResult.trait_letter_size != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_letter_size}</Text> : null}
                                    {singleProfile[0].outputResult.trait_letter_slant != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_letter_slant}</Text> : null}
                                    {singleProfile[0].outputResult.trait_letter_t != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_letter_t}</Text> : null}
                                    {singleProfile[0].outputResult.trait_line_spacing != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_line_spacing}</Text> : null}
                                    {singleProfile[0].outputResult.trait_margin_left != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_margin_left}</Text> : null}
                                    {singleProfile[0].outputResult.trait_margin_right != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_margin_right}</Text> : null}
                                    {singleProfile[0].outputResult.trait_pen_pressure != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_pen_pressure}</Text> : null}
                                    {singleProfile[0].outputResult.trait_tittle_i != '' ? <Text style={{ marginTop: 7, color: '#000' }}>{singleProfile[0].outputResult.trait_tittle_i}</Text> : null}

                                </Card.Content>


                            </Card>
                        </View>


                        <ButtonComponent
                            //loading={loading}
                            mode="contained"
                            //onPress={() => navigation.navigate('MainBottomNavContainer')}
                            onPress={() => backToLoadedProfiles()}
                            style={{ width: 340, height: 51, marginTop: 20, marginBottom: 20 }}
                        >
                            Back to profiles
                        </ButtonComponent>
                    </View>

                </ScrollView>
                :
                <ScrollView >

                    <View style={styles.container} >

                        <Card style={{ borderColor: '#F2994A', borderRadius: 13, borderWidth: 2, height: 225, width: 350, marginTop: 10 }}>

                            <Card.Content>
                                <Avatar.Image style={{ marginLeft: 5 }} size={64} source={require('../../assets/user3.png')} />
                                <Title style={{ marginTop: -10, marginBottom: 10, color: '#092C4C', fontSize: 17, }}></Title>
                                <Text style={{ marginTop: -85, marginBottom: 0, color: '#092C4C', fontSize: 14, marginLeft: 90, fontWeight: 'bold' }}>User Email : {user.email} </Text>

                                <Text style={{ marginTop: 5, marginBottom: 0, color: '#092C4C', fontSize: 14, marginLeft: 90, fontWeight: 'bold' }}>Last sign in : {user.metadata.lastSignInTime}</Text>
                                <Text style={{ marginTop: 5, marginBottom: 0, color: '#092C4C', fontSize: 14, marginLeft: 90, fontWeight: 'bold' }}>Member since : {user.metadata.creationTime} </Text>
                                <ButtonComponent
                                    //loading={loading}
                                    mode="contained"
                                    //onPress={() => navigation.navigate('MainBottomNavContainer')}
                                    onPress={() => loggedOut()}
                                    style={{ width: 300, marginLeft: 7, marginTop: 20 }}
                                >
                                    Log out
                                </ButtonComponent>
                            </Card.Content>


                        </Card>
                    </View>
                    <View style={styles.container}>







                    </View>
                    <Text style={{ fontSize: 20, color: '#092C4C', fontWeight: 'bold', marginLeft: 21, marginTop: -30, fontSize: 20, marginBottom: 10 }}> Saved Profiles </Text>
                    {loadingProfiles === true ? <ActivityIndicator style={{ marginTop: 20 }} size={'large'} color={'#092C4C'} /> :
                        <View>
                            {profiles.map((profile) =>

                                <View style={styles.container} key={profile.writerName}>

                                    <Card style={{ borderColor: '#092C4C', borderRadius: 13, borderWidth: 2, height: 180, width: 350 }}>

                                        <Card.Content>
                                            <Title style={{ marginTop: -10, marginBottom: 10, color: '#092C4C', fontSize: 17 }}>{profile.writerName}</Title>

                                        </Card.Content>
                                        <Card.Cover style={{ height: 82, width: 310, marginLeft: 17 }} source={{ uri: profile.handwritingImage }} />
                                        <Card.Actions>
                                            <Button style={{ color: '#092C4C' }} onPress={() => viewSavedProfile(profile.id)}><Text style={{ color: '#00B386' }}>View</Text></Button>
                                            <Button style={{ color: '#092C4C' }} onPress={() => deleteProfile(profile.id)}><Text style={{ color: '#f13a59' }}>Delete</Text></Button>
                                        </Card.Actions>
                                    </Card>
                                </View>


                            )}

                        </View>}





                </ScrollView>
            }

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingBottom: 20,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',


    }
});

export default Profile;
