import 'react-native-gesture-handler';
import { StyleSheet, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import Notification from './components/Notification';
import ShortsScreen from './components/ShortsScreen';
import RegisterScreen from './components/RegisterScreen';
import Profile from './components/Profile'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return(
    <Stack.Navigator screenOptions={{
      headerShown: true,
    }}>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}></Stack.Screen>
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true}}></Stack.Screen>
    <Stack.Screen name="Homepage" component={TabNavigator} options={{ headerShown: false}} ></Stack.Screen>
    </Stack.Navigator>
  );
}

const TabNavigator = () => {
  return(
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
     
    }}
    >
    <Tab.Screen name="Home" component={HomeScreen} options={{
           tabBarshowLabel: "false",
         headerShown: true,
           tabBarIcon: ({color, size}) => (
            <Ionicons name="home" size={size} color={color} />
           ),
          tabBarStyle:[{
          position:'absolute',
          bottom:15,
          left:10,
          right:10,
          elevation:0,
          backgroundColor:'#ffffff',
          borderRadius:15,
          height:70,
         ...styles.shadow,
          },
          ]
      }}/>
    
    <Tab.Screen name="Profile" component={ Profile } options={{
           tabBarshowLabel: "false",
           headerShown: "true",
           tabBarIcon: ({color, size}) => (
            <Feather name="bookmark" size={24} color={color}/>
           ),
          tabBarStyle:[{
          position:'absolute',
          bottom:15,
          left:10,
          right:10,
          elevation:0,
          backgroundColor:'#ffffff',
          borderRadius:15,
          height:70,
         ...styles.shadow,
          },
          ]
      }}/>

    <Tab.Screen name="Notifications" component={ ShortsScreen } options={{
           tabBarshowLabel: "false",
           headerShown: "true",
           tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications" size={size} color={color} />
           ),
          tabBarStyle:[{
          position:'absolute',
          bottom:15,
          left:10,
          right:10,
          elevation:0,
          backgroundColor:'#ffffff',
          borderRadius:15,
          height:70,
         ...styles.shadow,
          },
          ]
      }}/>

     
    
    <Tab.Screen name="Scanner" component={Notification} options={{
           tabBarshowLabel: "false",
           headerShown: true,
           tabBarIcon: ({color, size}) => (
            <AntDesign name="appstore-o" size={24} color={color} />
           ),
          tabBarStyle:[{
          position:'absolute',
          bottom:15,
          left:10,
          right:10,
          elevation:0,
          backgroundColor:'#ffffff',
          borderRadius:15,
          height:70,
         ...styles.shadow,
          },
          ]
      }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
   
   
    <NavigationContainer>
        <Drawer.Navigator  screenOptions={{
         headerShown: false,
         ShowLabel: false,
              
        }}>
          <Drawer.Screen name="Home" component={HomeStackNavigator} options={{ShowLabel: false}}></Drawer.Screen>
          
        </Drawer.Navigator>
    </NavigationContainer>
    
  

    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  shadow:{
     shadowColor:'#7F5DF0',
     shadowOffset:{
     width:0,
     height:10,
     },
     shadowOpacity:0.25,
     shadowRadius:3.5,
     elevation:5,
    
     }

  
});



