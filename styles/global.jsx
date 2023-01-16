import { StyleSheet } from "react-native"


export const globalStyles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
          
      },
      wrapper:{
        flex: 1,
      },

      flexRow: {
        flexDirection: 'row'
      },
    
     tweet: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingVertical: 12,
 
     
    },

    avatar : {
      width: "100%",
      height: "100%",
      
     
    },

    experience:{
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: "grey",
      flexDirection: 'row',
      marginTop: 20,
      borderRadius: 8,

    },

    experience1:{
      borderRightWidth: 1,
      borderColor: "grey",
      padding: 20,
      
    
    },
    experience2:{
      padding: 20,
      marginLeft: 15,
    },
    status:{
      color: "green",
    },


    tweetName : {
     fontWeight:'bold',
     color: '#fff',
     marginTop: 20,
     
    },

    tweetHandle : {
      color: 'grey'
    },

    tweetContentContainer : {
      marginTop: 4,
     
    },

    detail: {
     
      display: 'flex'
    },

    tweetSeparator : {
      borderBottomWidth:1,
      borderBottomColor:'#e5e7eb',
      marginHorizontal: 15,
      marginTop: 10,
    },

    tweetContent : {
      lineHeight:20
    },

    tweetEngagement : {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
    },

    floatingButton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1d9bf1',
      position: 'absolute',
      right:20,
      top: 500,
    
      
    },

    ml4 : {
      marginLeft: 30,
    },

    ml3 : {
      marginLeft:12,
    },
    ml2:{
      marginLeft: 5,
      fontSize: 20,
    },

    ml6 : {
      marginLeft: 100,
    },

    mt3: {
      marginTop:25,
    },


    //Tweet Screen

    profileContainer : {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
        width: '100%',
        height: 200,
    },

    mb4 : {
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
      paddingBottom:15
    },

    tweetEngagementLabel: {
      color: 'gray',
      marginLeft: 6,
    },

    clg : {
     
      marginLeft: 30,
    },
    mb1: {
      marginBottom: 10,
    },

    tweetEngagementNumber : {
      fontWeight:'bold',
    },

    //ProfileScreen

    backgroundImage : {
      width: 400,
      height: 100,
      
    },

    avatarContainer : {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingHorizontal: 10,
      marginTop: -35
    },
    
    line: {
       width: 80,
       height: 80,
       borderRadius: 40,
       borderWidth: 2,
       borderColor: 'white'
    },

    followButton: {
      backgroundColor: '#0f1418',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 24,
    },

    followButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },

    Button: {
      width:'80%',
      marginTop: 20,
      backgroundColor:"lightblue",
      height: 40,
      borderRadius: 4,
      lineHeight: 20,
    },

    nameContainer : {
      paddingHorizontal: 8,
      paddingVertical: 2,
    },

    profileName : {
      fontWeight: 'bold',
      fontSize: 22,
    },

    profilesContainer: {
      paddingHorizontal: 10,
      marginTop: 8,
    },

    profileContainerText : {
      lineHeight: 22,
    },

    textGray : {
      color: 'gray',
      
    },
 
    locationContainer : {
      flexDirection: 'row',
      paddingHorizontal: 10,
      marginTop: 12,
    },

    linkContainer : {
      flexDirection: 'row',
      paddingHorizontal: 10,
      marginTop: 1,
    },

    linkColor : {
      color : '#1d9bf1',
    },

    linkItem: {
      flexDirection: 'row',
    },

    followContainer : {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 12,
    },
    
    followItem : {
      flexDirection: 'row'
    },

    followItemNumber : {
      fontWeight: 'bold',
    },

    followItemLabel : {
      marginLeft: 4
    },

    //New Tweet

    tweetButton: {
      backgroundColor: '#1d9bf1',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 24,
      marginTop:20
    },

    tweetButtonContainer : {
       paddingVertical: 4,
       paddingHorizontal: 6,
       flexDirection: "row",
       justifyContent: 'space-between',
       alignItems: 'center',
    },

    tweetButtonText: {
      color: 'white',
      fontWeight: 'bold'
    },

    tweetBoxContainer: {
       flexDirection: 'row',
       paddingTop: 10,
    },

    Input : {
      fontSize: 18,
      lineHeight: 28,
      padding: 10,
      flex:1,
      borderWidth:1,
      borderColor:'#e5e7eb',
      width: "80%",
      height: 120,
      
    },

    input : {
      borderWidth:1,
      borderColor:'#e5e7eb',
      width: "80%",
      height: 40,
      paddingLeft: 10,
      borderRadius: 4,
    },

    textRed : {
      color: 'red',
    },

    textGreen : {
      color: 'green',
    },

    title : {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      alignContent: 'center',
      margin: 15,
    },

    //Performance
    performance: {
       borderWidth: 1,
       borderColor: "grey",
       width: "85%",
       margin: 20,
       borderRadius: 8,
       paddingBottom: 20,
    },

    performanceSeparator : {
      borderWidth:1,
      borderColor: "grey",
      marginLeft: 15,
    },

    tasks: {
      borderWidth: 1,
      borderColor: "grey",
      width: "85%",
      margin: 20,
      borderRadius: 8,
      paddingBottom: 20,
   },

   taskContainer:{
     backgroundColor: "grey",
     borderRadius: 4,
     padding: 5,
   },

   iconContainer:{
    backgroundColor: "orange",
    padding: 2,
    width: 30,
    borderRadius: 8,
    marginTop: -15,
    marginLeft: 15,
   },

  
   

})