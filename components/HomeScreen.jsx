import React , { useState, useEffect } from 'react'
import {StyleSheet, View, Text,TouchableOpacity, ActivityIndicator, TextInput, Modal, FlatList, SafeAreaView, ScrollView, ImageBackground, Image } from 'react-native'
import { globalStyles } from '../styles/global'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { auth, db ,query, collection, onSnapshot, where, signOut, getDocs ,updateDoc ,doc, serverTimestamp,addDoc} from '../firebase/config'
import { SelectList } from 'react-native-dropdown-select-list';


//Identify user
function HomeScreen ({navigation})  {


 
      const [isAdmin, setIsAdmin] = useState(() => {
        if (auth.currentUser.email  === "admin@gmail.com") {
            return true;
        }
        return false;
        
    });

 

//Logout
    const logout = () => {
      signOut(auth).then(() => {
        navigation.navigate('Login');
      }).catch((error) => {
        console.log(error.message)
      });
    }

  //Loading function
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setisLoading(false), 1500)
  }, [])
  

  //UserData

  const [user, setUser] = useState([])
  
  useEffect(() =>{

      const q = query(collection(db, "User"),where("user_id", "==", `${auth.currentUser.uid}`));

      onSnapshot(q, (querySnapshot) => {
   
        const users = [];
        setUser([])
        
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
          setUser( prevState => [ ...prevState, { ...doc.data(), key: doc.id } ] );

            
        });
      });
       
 
     

     
  }, [setUser])
  
  //Topup Modal
  const [modalVisible, setModalVisible] = useState(false);

  //purchase Modal
  const [modal, setModal] = useState(false);
  
  //Paypal
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [amount, setAmount] = useState(0);
  const [progClr, setProgClr] = useState('#000');
  
 
  function topUp(){
    
      const q = query(collection(db, "User"),where("user_id", "==", `${auth.currentUser.uid}`));
      

      getDocs(q)
        .then((snapshot) =>{
          var id;
          var user;
         
        snapshot.docs.forEach((doc) =>{
            id = doc.id;
            user = doc.data();
          })

          updateDoc(doc(db, 'User', id), {
            AccountBalance: parseInt(user.AccountBalance) + parseInt(amount)
            
        })
         
        }) 
  }

  function pay(){
      
    const q = query(collection(db, "User"),where("user_id", "==", `${auth.currentUser.uid}`));
    

    getDocs(q)
      .then((snapshot) =>{
        var id;
        var user;
       
      snapshot.docs.forEach((doc) =>{
          id = doc.id;
          user = doc.data();
        })
        
        if((user.AccountBalance >= purchase) && (purchase > 0)){
        updateDoc(doc(db, 'User', id), {
          AccountBalance: parseInt(user.AccountBalance) - parseInt(purchase)
          
        })

        let x = Math.floor((Math.random() * 100) + 1);

        addDoc(collection(db, 'TicketNumber'), {
        
          Email: auth.currentUser.email,
          Ticket: x,
          TicketPrice: purchase,
          created: serverTimestamp(),

        })
        }else{
          alert("YOU HAVE INSUFFICIENT FUNDS");
        }
       
      })

      alert("CONFIRMED PURCHASE AT $" + purchase);
      !setModal(false)

    }

  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    let payment = JSON.parse(data);

    if (payment.status === 'COMPLETED') {
      alert('PAYMENT MADE SUCCESSFULLY!');
      topUp();
      !setModalVisible(false);
    } else {
      alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
    }
  }



//post ticket
const[modalOpen, setModalOpen] = useState(false);

const [selected, setSelected] = React.useState("");
const [purchase, setPurchase] = React.useState("");
const [lottery, setLottery] = useState('');
const [ticketprice, setTicketPrice] = useState('');
const [time, setTime] = useState('');

const data = [
  {key: 'Live Win', value: 'Live Win'},
  {key: 'Mega Win', value: 'Mega Win'},
  
]

const price = [
  {key: 1500, value: 1500},
  {key: 500, value: 500},
  {key: 800, value: 800}
  
]



const game = () => {
  addDoc(collection(db, 'GameTickets'), {
      GameType: selected,
      LotteryName: lottery,
      TicketPrice: ticketprice, 
      Time: time,
      created: serverTimestamp(),
  })
  
  addDoc(collection(db, 'Notifications'), {
    Game: selected,
    Details: "Game Tickets have been posted",
    created: serverTimestamp(),
  })
  
  alert("Ticket posted successfully");
  
  }

//retrieve all tickets for admin
const [Tickets, setTickets] = useState([]);
    
useEffect(() =>{
   const collectionRef = collection(db, 'GameTickets')
   const queue = query(collectionRef);

   

   const unsubscribe = onSnapshot(queue, (snapshot) =>{
     const list = [];
     setTickets([]);
     
     snapshot.docs.forEach(doc => {
      list.push(doc.data());
      setTickets( prevState => [ ...prevState, { ...doc.data(), key: doc.id } ] )
    })

    })

    return unsubscribe;

} , []);

    if(isLoading){
     
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="peach"/>
          
        </View>  
      )
    }

   
  return (
    //Admin

      <View>
         
      {isAdmin ?
      
      <View style={styles.container}>

     <View style={[globalStyles.container, {marginBottom: 150}]}>
         
         <Text style={{fontSize:20,marginLeft:-5, marginTop: -5,fontWeight:'bold'}}>Posted Tickets</Text>
         <View style={{
           paddingHorizontal:10,
           paddingVertical:15, 
         }}>
        
        <FlatList
        data={Tickets}
        renderItem={({ item }) => (
           <View style={[{ borderWidth:1, borderColor:"lightgrey", borderRadius: 8, padding: 20, marginBottom: 10} ]}>
             <Text>GameType: {item.GameType}</Text>
             <Text>Name: {item.LotteryName}</Text>
             <Text>Ticket Price: $ {item.TicketPrice}</Text>
             <Text>Start Time: {item.Time}</Text>
           </View>
        )}/>
       
       </View>

      
      </View>

      <Modal visible={modalOpen}
       animationType = "slide"
       transparent={true}
       style={{marginTop: 80,  elevation: 5}}
       >
      <ScrollView style={[styles.container,{borderRadius: 4, marginTop: 50} ]}>
        
        <ScrollView style={{backgroundColor: '#fff',marginTop: 15, width: 300,height:530, borderRadius: 8,  marginLeft: 10}}>
        
          
          <TouchableOpacity
           style={{ position:'absolute', top:15, left:260}}
           onPress={() => setModalOpen(false)}

           >
             <AntDesign name="close" size={22} color="black"  />
        </TouchableOpacity>
                
                
                
                <Text style={[styles.title,{marginLeft: 80, marginTop: 50}]}>New Game</Text>
                <Text style={styles.sub_title}>To Earn Even More</Text>

                <View style={[ {width: 240, marginLeft: 30, marginTop: 30}]}>
                <SelectList data={data} setSelected={setSelected} inputStyles />
                </View>
                
                <TextInput
                    placeholder='Lottery Name'
                    style={styles.input}
                    value={lottery}
                    onChangeText={setLottery}
                />

                <TextInput
                    placeholder='Ticket Price'
                    style={styles.input}
                    value={ticketprice}
                    keyboardType="numeric"
                    onChangeText={setTicketPrice}
                />

               <TextInput
                    placeholder='Time (12:00 am)'
                    style={styles.input}
                    value={time}
                    onChangeText={setTime}
                />

              <View style={[styles.buttonContainer, {marginLeft: 5}]}>
                    <TouchableOpacity
                    onPress={() => game()} 
                    style={[styles.button, {width: 240, marginLeft: 20}]}
                    >
                    <Text
                    style={[styles.buttonText, styles.buttonLinetext, {marginLeft: -10}]}
                    >
                    Post
                    </Text>
                    </TouchableOpacity>
                    </View>

                </ScrollView>

                   
            
             
        </ScrollView>
       </Modal>

        <TouchableOpacity
            style={globalStyles.floatingButton}
            onPress={() => setModalOpen(true)}
            >
              <AntDesign name="plus" size={22} color="white" />
         </TouchableOpacity>
    
      </View>
     


      :

    //User
    <ScrollView style={styles.container}>
      <FlatList
        data={user}
        renderItem={({ item }) => (
          <ImageBackground
          style={styles.image}
          source={require('../assets/images/account.jpg')}
          borderRadius={8}
          >
          <View style={{ padding: 20, borderRadius: 8, marginTop: 10, height: 180}}>
            <View style={[globalStyles.linkContainer, {marginBottom: 20, marginTop: -10, padding: 10}]}>
              <View>
                <Text style={{marginLeft: 5, color: '#fff', fontSize: 18}}>{item.FirstName} {item.LastName}</Text>
              </View>
              <View style={{marginLeft: 160}}>
              <Entypo name="log-out" size={24} color="white"   onPress={() => logout()}  />
              </View>
            </View>
            
            <Text style={{fontSize: 18, color: '#fff', marginLeft: 15}}>Personal Account</Text>
            <Text style={{fontSize: 30, color: '#fff', marginLeft: 15}}> ${item.AccountBalance}</Text>
          </View>
          </ImageBackground>
        
       )}
       />

      <TouchableOpacity  style={[styles.button, {marginLeft: 10, }]}
        onPress={() => setModalVisible(true)}  >
         <Text style={{color: "#fff", fontSize: 18}}>Top Up</Text>
      </TouchableOpacity>

      <View style={{marginTop: -60}}>
      <Text style={{fontSize:18, fontWeight: 'bold', marginLeft: 5, marginBottom: 10}}>Tickets</Text>
      <FlatList
      
        data={Tickets}
        renderItem={({ item }) => (
          
          <View style={[globalStyles.linkContainer,{ borderWidth:1, borderColor:"lightgrey", borderRadius: 8, padding: 20, marginBottom: 10} ]}>
           <View style={{}}>
             <Text>GameType: {item.GameType}</Text>
             <Text>Name: {item.LotteryName}</Text>
             <Text style={{color: "orange", fontWeight: "bold"}}>Ticket Price: $ {item.TicketPrice}</Text>
             <Text>Start Time: {item.Time}</Text>
           </View>

           <View style={[styles.buttonContainer, {marginLeft: 200, marginTop: 5, position: "absolute"}]}>
                    <TouchableOpacity
                    style={[styles.button1, {width: 100} ]}
                    onPress={() => setModal(true)}
                    >
                    
                    <Text
                    style={[styles.buttonText, styles.buttonLinetext, ]}
                    >
                    Purchase
                    </Text>
                    </TouchableOpacity>
                    </View>
          </View>
        )}/>
        </View>
     

      <View >
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
                
                
                
                <Text style={styles.title}>Top Up</Text>
                <Text style={styles.sub_title}>To Earn Even More</Text>
                
                <TextInput
                    placeholder='Amount'
                    style={styles.input}
                    value={amount}
                    keyboardType="numeric"
                    onChangeText={setAmount}
                />

              <View style={[styles.buttonContainer, {marginLeft: 5}]}>
                    <TouchableOpacity
                    onPress={() => setShowGateway(true)} 
                    style={[styles.button, {width: 240, marginLeft: 20}]}
                    >
                    <Text
                    style={[styles.buttonText, styles.buttonLinetext, {marginLeft: -10}]}
                    >
                    Pay
                    </Text>
                    </TouchableOpacity>
                    </View>

                </View>

                   
            
             
        </ScrollView>
       </Modal>

       <Modal visible={modal}
       animationType = "slide"
       transparent={true}
       style={{marginTop: 50,  elevation: 5}}
       >
      <ScrollView style={[styles.container,{borderRadius: 4, marginTop: 50} ]}>
        
        <View style={{backgroundColor: '#fff',marginTop: 15, width: 300,height:500, borderRadius: 8, paddingVertical: 30, marginLeft: 10}}>
        
          
          <TouchableOpacity
           style={{ position:'absolute', top:20, left:260}}
           onPress={() => !setModal(false)}

           >
             <AntDesign name="close" size={22} color="black"  />
        </TouchableOpacity>
                
                
                
                <Text style={[styles.title, {marginLeft: 85}]}>Purchase</Text>
                <Text style={styles.sub_title}>To Earn Even More</Text>

               <View style={[ {width: 240, marginLeft: 30, marginTop: 30}]}>
                <SelectList data={price} setSelected={setPurchase} inputStyles />
                </View>
                
                

              <View style={[styles.buttonContainer, {marginLeft: 5}]}>
                    <TouchableOpacity
                    onPress={() => pay()}
                    style={[styles.button, {width: 240, marginLeft: 20}]}
                    >
                    <Text
                    style={[styles.buttonText, styles.buttonLinetext, {marginLeft: -10}]}
                    >
                    Confirm Purchase
                    </Text>
                    </TouchableOpacity>
                    </View>

                </View>

                   
            
             
        </ScrollView>
       </Modal>

      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        
      </View>
      {showGateway ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'fade'}
          transparent>
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{padding: 13}}
                onPress={() => setShowGateway(false)}>
                <Feather name={'x'} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                PayPal GateWay
              </Text>
              <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{uri: 'https://my-pay-web.web.app/'}}
              style={{flex: 1}}
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              onMessage={onMessage}
            />
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
      
    </View>

      
    </ScrollView>
    
      }
    </View>
    );
  
  }



export default HomeScreen

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
  marginLeft: 90,
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
