import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, Modal, ImageBackground} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { globalStyles } from '../styles/global'
import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { auth, db , query, collection, onSnapshot, where } from '../firebase/config'
import { ScrollView } from 'react-native-gesture-handler';


export default function Notification() {
  const [modalOpen, setModalOpen] = useState(false);
//identify user
  const [isAdmin, setIsAdmin] = useState(() => {
    if (auth.currentUser.email === "admin@gmail.com") {
      return true;
    }
    return false;
  });

    //retrieve all tickets for admin

const [Tickets, setTickets] = useState([]);  
useEffect(() =>{
  const ticket = query(collection(db, "TicketNumber") ,where("Email", "==", `${auth.currentUser.email}`))
  onSnapshot(ticket, (querySnapshot) =>{
    const tickets = [];
    setTickets([]);

    querySnapshot.forEach((doc) => {
      tickets.push(doc.data())
      setTickets( prevState => [ ...prevState, { ...doc.data(), key: doc.id } ] );
      
    })
  })
} , []);


  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What hNotificationens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }



  // Return the View
  return (
    <View>
    {isAdmin ?
    <View style={styles.container}>
      <View style={[styles.barcodebox, {marginTop:500}]}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
    :
    <ScrollView style={{marginBottom: 100}}>
      <ImageBackground
          style={[styles.image, {height: 100, marginHorizontal: 30, marginTop: 20}]}
          source={require('../assets/images/account.jpg')}
          borderRadius={8}
      >
        <Text style={{fontSize: 18, color: '#fff', marginLeft: 80, marginTop: 25}}>Win Grand Prize </Text>
        <Text style={{fontSize: 18, color: '#fff', marginLeft: 100}}>$100,000</Text>
      </ImageBackground>
       
          <Text style={{marginHorizontal: 30, marginVertical: 20}}>Your Ticket Number</Text>
          <FlatList
            data={Tickets}
            renderItem={({ item }) => (
              
              <View style={[globalStyles.linkContainer]}>
              <View style={[styles.qrcode, {marginTop: 30, marginLeft: 30}]} >
              <QRCode value={[`Email : `, item.Email,  `/n Ticket Number : `, item.Ticket]} size={105}/>
              </View>
              <View style={{marginLeft: 50, marginTop: 50}}>
              <Text>Ticket Number:{item.Ticket}</Text>
              </View>
             
             </View>
            )}/>
        

          <Modal 
          visible={modalOpen} 
          animationType="slide"
          transparent={true}
          
          >
            <View style={[styles.container, {backgroundColor: '#fff',marginTop: 70, width: 300,height:500, borderRadius: 8, marginVertical: 200, marginLeft: 30}]}>
              
                <TouchableOpacity
                  style={{  top: -20, left: 120 }}
                  onPress={() => setModalOpen(false)}
                >
                  <AntDesign name="close" size={22} color="#000" />
                </TouchableOpacity>
                
              

                <View style={styles.barcodebox}>
                    <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 200 }} />
                    </View>
                    <Text style={styles.maintext}>{text}</Text>

                    {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' style={{marginLeft: -20}} />}
                  
            </View>
            </Modal>

             

              
    </ScrollView>
    }
    <TouchableOpacity
                style={[globalStyles.floatingButton, { marginLeft:280}]}
              onPress={() => setModalOpen(true)}>
              <MaterialIcons name="qr-code-scanner" size={24} color="white" style={{fontWeight: "900"}} />

            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
  },
 
});