//imports
import React, { useState} from 'react';
import { TextInput, Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../firebase/config';



export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    const handleEmailChange = (text) => {
        setEmail(text);
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    }

    const loginUser = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setError('')
        navigation.navigate('Homepage', {
                user: user,
            
        });
      })
      .catch((err) => {
        
        setError(err.message)
        setTimeout(() => setError(''), 2000)
    
      })
    
    }
    

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/images/lottery.png')}
                blurRadius={0.5}
                
               
            >
              
                
                <View style={{backgroundColor: '#fff', width: 300, borderRadius: 4, paddingVertical: 20, opacity: 0.9}}>
                <Image
                 source={require('../assets/images/logo.png')}
                 style={styles.logo}
                 resizeMode="contain"
                ></Image>
                
                <Text style={styles.title}>Lottery</Text>
                <Text style={styles.sub_title}>All We Do Is Win</Text>
               
                <View style={{marginVertical: 5, marginLeft: 30}}>
                    <Text style={{color: "red"}}>{error}</Text>
                </View>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    value={email}
                    onChangeText={handleEmailChange}
                />
                
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry
                />
                </View>

                    <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    onPress={loginUser}
                    style={styles.button}
                    >
                    <Text
                    style={[styles.buttonText, styles.buttonLinetext]}
                    >
                    Login
                    </Text>
                    </TouchableOpacity>
                    </View>

                  

                    
                    <TouchableOpacity
                     onPress={() => navigation.navigate('Register')}
                    >
                  
                    <Text
                    style={[styles.buttonText, styles.buttonLinetext, {marginTop:15, marginLeft: -5, color: "black"}]}
                    >
                    Register Now ?
                    </Text>
                    
                    
                    </TouchableOpacity>
                   
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: '80%',
        borderColor: 'gray',
        borderWidth: 2,
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
       marginBottom: 20,
       marginTop: 30,
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
        marginLeft: 95,
    },
    button: {
        backgroundColor: 'black',
        width: 290,
        padding: 15,
        borderRadius:10,
        alignItems: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
      },

      
     
      
})