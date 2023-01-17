import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text,TouchableOpacity, ActivityIndicator, TextInput, Modal, FlatList, SafeAreaView, ScrollView, ImageBackground, Image, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import { auth, db , query, collection, onSnapshot, where, getDocs, updateDoc, doc, addDoc } from '../firebase/config'


export default function Profile({navigation}) {

  const [isAdmin, setIsAdmin] = useState(() => {
    if (auth.currentUser.email  === "admin@gmail.com") {
        return true;
    }
    return false;
    

});


const [count, setCount] = useState(3);
const [intervalId, setIntervalId] = useState(null);
const [isRunning, setIsRunning] = useState(false);


const startTimer = () => {
  setIsRunning(true);
  const id = setInterval(() => {
    setCount(count - 1);
   
  }, 1000);
  setIntervalId(id);
  if (count === 1) {
    winner()
  }
};



const stopTimer = () => {
  clearInterval(intervalId);
  setIsRunning(false);
  setCount(3);
};

const pauseTimer = () => {
  clearInterval(intervalId);
  setIsRunning(false);
};



const [modalVisible, setModalVisible] = useState(false);
  
function winner(){
  
  setModalVisible(true);
  const q = query(collection(db, "List"));
      

  getDocs(q)
    .then((snapshot) =>{
      var list;
     
    snapshot.docs.forEach((doc) =>{
        list = doc.data()["Array"]
      })

    const winningTicket = [list[0], list[1]];
    

    const random = Math.floor(Math.random() * winningTicket.length);
    const luckyNumber = winningTicket[random];
    
     

    const lucky = query(collection(db, "TicketNumber"), where ("Ticket", "==", luckyNumber));
      
        getDocs(lucky)
          .then((snapshot) =>{
           
            var chosen;
            
          
          snapshot.docs.forEach((doc) =>{
          
              chosen = doc.data();
             
            })

     const winner = query(collection(db, "User"), where ("Email", "==", chosen.Email));
      
        getDocs(winner)
          .then((snapshot) =>{
            var id;
            var user;
          
          snapshot.docs.forEach((doc) =>{
              id = doc.id;
              user = doc.data();
              
            })

            updateDoc(doc(db, 'User', id), {
              AccountBalance: parseInt(user.AccountBalance) + parseInt(100000)
              
          })

          addDoc(collection(db, 'Notifications' ), {
        
            Email: chosen.Email,
            Details: "You are our lucky lottery winner of 100,000"
  
          })
    }) 
  }) 
  }) 
  
}

    //retrieve all players

    const [Tickets, setTickets] = useState([]);  
    useEffect(() =>{
      const ticket = query(collection(db, "TicketNumber"))
      onSnapshot(ticket, (querySnapshot) =>{
        const tickets = [];
        setTickets([]);
    
        querySnapshot.forEach((doc) => {
          tickets.push(doc.data())
          setTickets( prevState => [ ...prevState, { ...doc.data(), key: doc.id } ] );
          
        })
      })
    } , []);


  
  return (
    <View style={{marginTop: 50}}>
      <Text style={{marginVertical: 10, fontSize: 18, marginLeft: 100, fontWeight: 'bold'}}>Lottery CountDown</Text>
     
     {isAdmin ?
      <View style={[{marginTop: 20}]}>

      
        
      <View>
      <Text style={{padding:25, fontSize: 150, marginLeft: 100}}>{count}</Text>
      {isRunning ? (
        <View style={[styles.buttonContainer, {marginLeft: 5}]}>
        <TouchableOpacity
        onPress={pauseTimer} 
        style={[styles.button, {width: 240, marginLeft: 50,  backgroundColor: "lightblue"}]}
        >
        <Text
        style={[styles.buttonText, styles.buttonLinetext, {}]}
        >
        Pause
        </Text>
        </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.buttonContainer, {marginLeft: 5}]}>
          <TouchableOpacity
          onPress={startTimer} 
          style={[styles.button, {width: 240, marginLeft: 50,  backgroundColor: "lightgreen"}]}
          >
          <Text
          style={[styles.buttonText, styles.buttonLinetext, {}]}
          >
          Start
          </Text>
          </TouchableOpacity>
        </View>

              
      )}
      <View style={[styles.buttonContainer, {marginLeft: 35, marginTop: -70}]}>
        <TouchableOpacity
        onPress={stopTimer} 
        style={[styles.button, {width: 240, marginLeft: 20, backgroundColor: "crimson"}]}
        >
        <Text
        style={[styles.buttonText, styles.buttonLinetext, {}]}
        >
        Stop
        </Text>
        </TouchableOpacity>
        </View>

    </View>
    </View>
      :
      <View>
        <Text style={{padding:25, fontSize: 150, marginLeft: 100}}>{count}</Text>
        <Text style={{fontSize:25,marginLeft: 40, marginTop: -20}}>Players</Text>
        <ScrollView style={{backgroundColor: "#fff", padding: 20, width: 300,height:250, margin: 30, borderRadius: 4}}>
         

          <FlatList
            data={Tickets}
            renderItem={({ item }) => (
              
              <View style={[{ borderWidth:1, borderColor:"lightgreen", borderRadius: 8, padding: 20, marginBottom: 10, marginHorizontal: 10} ]}>
              
              <Text>{item.Email}</Text>
              
             </View>
            )}/>

        </ScrollView>

      </View>}

  <View style={{flex:1, display: "flex"}}>
      <Modal visible={modalVisible}
       animationType = "slide"
       transparent={true}
       style={{marginTop: 80,  elevation: 5}}
       >
      <ScrollView style={[styles.container,{borderRadius: 4, marginTop: 50} ]}>
        
        <View style={{backgroundColor: '#fff',marginTop: 15, width: 300,height:300, borderRadius: 8, paddingVertical: 30, marginLeft: 10}}>
        
          
          <TouchableOpacity
           style={{ position:'absolute', top:20, left:260}}
           onPress={() => !setModalVisible(false)}

           >
             <AntDesign name="close" size={22} color="black"  />
        </TouchableOpacity>
                
                
                
                <Text style={styles.title}>Winner </Text>
                <Text style={styles.sub_title}>$100,000</Text>
                
                <Text style={{marginHorizontal: 20, textAlign: "center"}}>Winner has been credited to his or her account please check your account balance</Text>

              <View style={[styles.buttonContainer, {marginLeft: 5}]}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Home')} 
                    style={[styles.button, {width: 240, marginLeft: 20}]}
                    >
                    <Text
                    style={[styles.buttonText, styles.buttonLinetext, {}]}
                    >
                    Check Account Balance
                    </Text>
                    </TouchableOpacity>
                    </View>

                </View>

                   
            
             
        </ScrollView>
       </Modal>
        
      </View> 
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
   paddingHorizontal: 20,
   paddingVertical: 20,
   marginBottom: 50,
  },
  card:{
   height:200,
   backgroundColor:'#A0522D',
   borderRadius:15,
   flexDirection:"row",
   justifyContent:'space-between'
  },
  left:{
   paddingHorizontal:10,
   paddingVertical:20,
  },
  right:{
   alignItems:'center',
   justifyContent:'center',
   paddingHorizontal:70,
   paddingVertical:20,
  },
  topUp:{
     marginTop:10,
     padding:22,
     justifyContent:"center",
     alignItems:"center",
     backgroundColor:"#A0522D",
     borderRadius:10,
   
  },
  loader:{
   marginTop: "90%",
  },
  centeredView: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   marginTop: 22
 },
 modalView: {
   margin: 20,
   backgroundColor: "white",
   borderRadius: 20,
   padding: 35,
   alignItems: "center",
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 2
   },
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5
 },
 button: {
   borderRadius: 20,
   padding: 0,
   elevation: 2
 },
 
 
 textStyle: {
   color: "white",
   fontWeight: "bold",
   textAlign: "center"
 },
 modalText: {
   marginBottom: 15,
   textAlign: "center"
 },
 button: {
   backgroundColor: 'black',
   width: 290,
   padding: 15,
   borderRadius:10,
   alignItems: 'center',
   marginTop: 20,
 },
 button1:{
   backgroundColor: 'black',
   width: 150,
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
 btnCon: {
   height: 45,
   width: '70%',
   elevation: 1,
   backgroundColor: '#00457C',
   borderRadius: 3,
 },
 btn: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 btnTxt: {
   color: '#fff',
   fontSize: 18,
 },
 webViewCon: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
 },
 wbHead: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#f9f9f9',
   zIndex: 25,
   elevation: 2,
 },
 
 
 logo:{
  height: 50,
  marginBottom: 30,
  marginTop: 30,
  marginLeft: -100,
 },
 image: {
   flex: 1,
   resizeMode: 'stretch',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 8,
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
   marginBottom: 10,
   marginLeft: 110,
 },
 button: {
   backgroundColor: 'black',
   width: 290,
   padding: 15,
   borderRadius:10,
   alignItems: 'center',
   marginTop: 20,
   marginBottom: 100,
 },
 buttonText: {
   color: '#fff',
   fontWeight: '700',
   fontSize: 16,
 },
 list:{
   marginBottom: 10,
 },
 image: {
   flex: 1,
   resizeMode: 'stretch',
   justifyContent: 'center',
   alignItems: 'center',
 },
 })
