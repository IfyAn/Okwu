import React,{useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback,SafeAreaView, Keyboard, TextInput, KeyboardAvoidingView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'  
import { auth, db } from '../firebase'
import * as firebase from 'firebase'

const ChatScreen = ({navigation, route}) => {

      const [input, setInput] = useState('')
      const [messages, setMessages] = useState([])

      const sendMessage=()=>{
            Keyboard.dismiss()
            db.collection('chats').doc(route.params.id).collection('messages').add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  message:input,
                  displayName:auth.currentUser.displayName,
                  email:auth.currentUser.email,
                  photoURL:auth.currentUser.photoURL,
            }),
            setInput('')
      }

      useLayoutEffect(() => {
         const unsubscribe= db
         .collection('chats')
         .doc(route.params.id)
         .collection('messages').orderBy('timestamp', 'desc')
         .onSnapshot((snapshot)=>setMessages(
               snapshot.docs.map((doc)=>({
                     id:doc.id,
                     data:doc.data(),
               }))
         ))
            return unsubscribe
      }, [route])

      useLayoutEffect(()=>{
            navigation.setOptions({
                  headerBackTitleVisible:false,
                  headerStyle:{backgroundColor:'purple'},
                  headerTitleStyle:{color: 'black'},
                  title:'Chat',
                 // headerTitleAlign:'left',
                  headerTitle:()=>{
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                              <Avatar rounded source={{uri:messages?.[0]?.data.photoURL ||'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'}} />
                                    <Text style={{color:'white',fontWeight:'400',  marginLeft:0}}>{route.params.chatName}</Text>
                              </View>
                  },
                  headerLeft: () =>(
                        <TouchableOpacity onPress={navigation.goBack}>
                              <AntDesign name='arrowleft' size={24} color='white' />            
                        </TouchableOpacity>
                   ),
                  headerRight:()=>(
                     <View style={{width:80, marginRight:20,flexDirection:'row', justifyContent:'space-between'}}>
                           <TouchableOpacity activeOpacity={0.5}>
                                <FontAwesome name='video-camera' size={24} color='blue' />
                           </TouchableOpacity>
                           <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddChat')}>
                                <Ionicons name='call' size={24} color='blue' />
                           </TouchableOpacity>
                     </View>
                  )
            })
      },[navigation, messages])
      return (
            <SafeAreaView style={styles.cover}>
                  <StatusBar style='light' />
                  <KeyboardAvoidingView
                        style={styles.container} 
                        behavior={Platform.OS==='ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={90}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                              <>
                              <ScrollView contentContainerStyle={{padding:15}}>
                                    {messages.map(({id, data})=>data.email === auth.currentUser.email ? (
                                          <View key={id} style={styles.reciever}>
                                                <Avatar rounded bottom={-15} right={-5} size={30} source={{uri:data.photoURL,}}   containerStyle={{position:'absolute', bottom:-15,right:-5}}v/>
                                                <Text style={styles.recieverText}>{data.message}</Text>
                                          </View>
                                    ) : (
                                          <View style={styles.sender} key={id}>
                                                <Avatar
                                                      position='absolute'
                                                      containerStyle={{position:'absolute', bottom:-15,left:-5}} source={{uri:data.photoURL,}}  bottom={-15} leftt={-5} size={30}
                                                 />
                                                <Text style={styles.senderText}>{data.message}</Text>
                                                <Text style={styles.senderName}>{data.displayName}</Text>
                                          </View>
                                    ))}
                              </ScrollView>
                              <View style={styles.footer}>
                                    <TextInput placeholder='Your Message' onSubmitEditing={sendMessage} value={input} onChangeText={(text)=>setInput(text)} style={styles.textInput} />
                                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                          <Ionicons name='send' size={24} color='#2B68EB' />
                                    </TouchableOpacity>
                              </View>
                              </>
                        </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
            </SafeAreaView>
      )
}

export default ChatScreen

const styles = StyleSheet.create({
      container:{
            flex:1
      },
      cover:{
            flex:1,
            backgroundColor:'white',
      },
      footer:{
            flexDirection:'row',
            alignItems:'center',
            width:'100%',
            padding:10
      },
      reciever:{
            padding:10,
            backgroundColor:'#ECECEC',
            alignSelf:'flex-end',
            borderRadius:15,
            marginBottom:20 ,
            marginRight:1,
            maxWidth:'80%',
            position:'relative'
      },
      recieverText:{
            color:'black',
            fontWeight:'400',
            marginLeft:10,
      },
      sender:{
            padding:15,
            backgroundColor:'pink',
            alignItems:'flex-start',
            borderRadius:15,
            margin:15,
            maxWidth:'80%',
            position:'relative'
      },
      senderName:{
            fontSize:10,
            paddingRight:10,
            left:10
      },
      senderText:{
            color:'white',
            fontWeight:'400',
            marginLeft:10,
            marginBottom:15
      },
      textInput:{
            bottom:0,
            height:40,
            color:'grey',
            flex:1,
            borderRadius:30,
            padding:10,
            marginRight:15,
            backgroundColor:'#ECECEC'
      },
})
