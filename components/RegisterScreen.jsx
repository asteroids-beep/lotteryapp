import React, { useState, useEffect } from 'react'
import {  TextInput, Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import { auth, db ,createUserWithEmailAndPassword, addDoc, serverTimestamp, collection} from '../firebase/config'

export default function RegisterScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              
                const user = userCredential.user;
                
                addDoc(collection(db, 'User'), {
                    Email: email,
                    FirstName: firstName,
                    LastName: lastName,
                    role: "user",
                    AccountBalance: 0,
                    user_id: user.uid,
                    created: serverTimestamp(),
                })

                addDoc(collection(db, 'Notifications'), {
                    Email: email,
                    Details: "Your Account has been created successfully",
                    created: serverTimestamp(),
                })
                alert("created user successfully");
                navigation.navigate('Homepage');
    
            })
            .catch((error) => {
                
                console.log(errorCode, errorMessage);
            });
    }
    
  return (
<ScrollView style={styles.container}>
    <ImageBackground
        style={styles.image}
        source={require('../assets/images/lottery.png')}
        blurRadius={0.5}
        resizeMode="cover"
    >
        
       
        
        <View style={{backgroundColor: '#fff', width: 300, marginTop: 50, borderRadius: 4, paddingVertical: 20, opacity: 0.9}}>
        <Image
         source={require('../assets/images/logo.png')}
         style={styles.logo}
         resizeMode="contain"
        ></Image>

        <View>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.sub_title}>Access to new winnings</Text>
        </View>
        
        <TextInput
            placeholder='First Name'
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
        />

        <TextInput
            placeholder='Last Name'
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
        />

        <TextInput
            placeholder='Email'
            style={styles.input}
            value={email}
            onChangeText={setEmail}
        />
        
        <TextInput
            placeholder='Password'
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />

        </View>

            <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={register}
            style={styles.button}
            >
            <Text
            style={[styles.buttonText, styles.buttonLinetext]}
            >
            Sign Up
            </Text>
            </TouchableOpacity>
            </View>

    </ImageBackground>
</ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    input: {
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 20,
        paddingLeft: 15,
        padding: 10,
        marginVertical: 10,
        borderRadius: 4,
        marginLeft: 30,
        backgroundColor:"#fff",
        opacity: 1,
    },
    logo:{
       height: 50,
       marginBottom: 30,
       marginTop: 10,
       marginLeft: -100,
    },
    image: {
        flex: 1,
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 100,
    },
    sub_title:{
        fontSize: 15,
        color: "grey",
        marginBottom: 20,
        marginLeft: 70,
    },
    button: {
        backgroundColor: 'black',
        width: 290,
        padding: 15,
        borderRadius:10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 50,
      },
      buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
      },
     
      
})
