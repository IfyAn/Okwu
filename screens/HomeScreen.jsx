import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Avatar, Button } from 'react-native-elements'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import CustomList from '../components/CustomList'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const HomeScreen = ({navigation}) => {
      const [chats, setChats] = useState([])
   const signOutUser=()=>{
            auth.signOut().then(()=>{
                  navigation.replace('Login')
            })
      }
useEffect(()=>{
      const unsubscribe=db.collection('chats').onSnapshot((snapshot)=>
      setChats(
            snapshot.docs.map((doc)=>({
                  id:doc.id,
                  data:doc.data(),
            }))
      ))
      return unsubscribe
}, []) 

      useLayoutEffect(() => {
          navigation.setOptions({
                headerStyle:{backgroundColor:'#ffff'},
                headerTitleStyle:{color: 'black'},
                headerTintColor:'black',
                headerLeft: () =>(
                      <View style={{marginLeft:20}}>
                        <TouchableOpacity activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL}} />
                        </TouchableOpacity>
                      </View>
                ),
                headerRight:()=>(
                   <View style={{width:80, marginRight:20,flexDirection:'row', justifyContent:'space-between'}}>
                         <TouchableOpacity activeOpacity={0.5}>
                              <AntDesign name='camerao' size={24} color='black' />
                         </TouchableOpacity>
                         <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddChat')}>
                              <SimpleLineIcons name='pencil' size={24} color='blue' />
                         </TouchableOpacity>
                   </View>
                )
          })
      }, [navigation])

      const enterChat=(id,chatName)=>{
            navigation.navigate('Chat',{
                  id,
                  chatName,
            })
      }

      return (
      <SafeAreaView>
                  <ScrollView style={styles.container}>
                        {chats.map(({id, data:{ chatName }})=>(
                                 <CustomList key={id} id={id} chatName={chatName} enterChat={enterChat} />
                        ))}
                      <Button title='Sign Out' containerStyle={{width:100}} onPress={signOutUser} />
                  </ScrollView>
            </SafeAreaView> 
            )
      }
                  {/* <View><Text>yfhioh</Text></View> */}

export default HomeScreen

const styles = StyleSheet.create({
      container:{
            height:'100%'
      }
})
