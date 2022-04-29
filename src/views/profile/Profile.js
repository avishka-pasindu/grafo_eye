
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
                        const { image, user, writer } = doc.data();
                        profileList.push({
                            id: doc.id,
                            writerName: writer,
                            handwritingImage: image


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
                        const { image, user, writer } = doc.data();
                        if (docID == doc.id) {
                            console.log('data added to single ptofile list...')
                            singleProf.push({
                                id: doc.id,
                                writerName: writer,
                                handwritingImage: image


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
                        <Text>Writer's name - {singleProfile[0].writerName}</Text>
                        <View>
                            <Image style={{ width: 340, height: 180, marginTop: 20, marginBottom: 10, borderRadius: 8, borderColor: '#092C4C', borderWidth: 2 }} source={{ uri: singleProfile[0].handwritingImage }} />
                        </View>


                        <ButtonComponent
                            //loading={loading}
                            mode="contained"
                            //onPress={() => navigation.navigate('MainBottomNavContainer')}
                            onPress={() => backToLoadedProfiles()}
                            style={{ width: 200 }}
                        >
                            Back to profiles
                        </ButtonComponent>
                    </View>

                </ScrollView>
                :
                <ScrollView >

                    <View style={styles.container}>

                        <Text>User Email : {user.email} </Text>

                        <Text>Last sign in : {user.metadata.lastSignInTime} </Text>
                        <Text>Member since : {user.metadata.creationTime} </Text>



                        <ButtonComponent
                            //loading={loading}
                            mode="contained"
                            //onPress={() => navigation.navigate('MainBottomNavContainer')}
                            onPress={() => loggedOut()}
                            style={{ width: 200 }}
                        >
                            Log out
                        </ButtonComponent>

                    </View>
                    <Text style={{ fontSize: 20, color: '#092C4C', alignContent: 'center', justifyContent: 'center', paddingStart: 60, fontWeight: 'bold', paddingBottom: 30 }}>________ Saved Profiles ________</Text>
                    {loadingProfiles === true ? <ActivityIndicator size={'large'} /> :
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
