import React , { useState, useEffect }from 'react'
import { Text, View, FlatList} from 'react-native'
import { globalStyles } from '../styles/global'
import { auth, db ,query, collection, onSnapshot, where, getDocs ,updateDoc ,doc, serverTimestamp,addDoc} from '../firebase/config'

function ShortsScreen() {

  //Identify User
  const [isAdmin, setIsAdmin] = useState(() => {
    if (auth.currentUser.email  === "admin@gmail.com") {
        return true;
    }
    return false;
    
});


   //NotificationData

   const [notification, setNotifications] = useState([])
  
   useEffect(() =>{
 
       const q = query(collection(db, "Notifications"),where("Email", "==", `${auth.currentUser.email}`));
 
       onSnapshot(q, (querySnapshot) => {
    
         const notifications = [];
         setNotifications([])
         
         querySnapshot.forEach((doc) => {
           notifications.push(doc.data());
           setNotifications( prevState => [ ...prevState, { ...doc.data(), key: doc.id } ] );
 
             
         });
       });
        
  
      
 
      
   }, [setNotifications])

   //Transactions

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
    <View>
      {isAdmin ?
      <View>
        <Text>Transactions</Text>
        <FlatList
            data={Tickets}
            renderItem={({ item }) => (
              
              <View style={[globalStyles.linkContainer, { borderWidth:1, borderColor:"lightgreen", borderRadius: 8, padding: 20, marginBottom: 10, marginHorizontal: 10} ]}>

              <View >
              <Text>.{item.Email}</Text>
              </View>
              <View>
              <Text>${item.TicketPrice}</Text>
              </View>
              
             </View>
            )}/>

      </View>
      :
    <View>
      <Text style={{padding: 20}}>Notifications</Text>
      <FlatList
        data={notification}
        renderItem={({ item }) => (
           <View style={[{ borderWidth:1, borderColor:"lightgreen", borderRadius: 8, padding: 20, marginBottom: 10, marginHorizontal: 10} ]}>
             <Text>Email: {item.Email}</Text>
             <Text>{item.Details}</Text>
           </View>
        )}/>
      
      </View>
      }
    </View>
  )
}

export default ShortsScreen