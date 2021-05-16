import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { auth, db } from '../firebase'

const AddChatScreen = ({navigation}) => {
      const [input, setInput] = useState([])

      useEffect(() => {
            navigation.setOptions({
                  headerStyle:{backgroundColor:'#ffff'},
                  title: 'Create A new Group',
                  headerTintColor:'black',    
            })
      }, [navigation])

      const createChat=async()=>{
            await db
            .collection('chats')
            .add({
                  chatName:input,
            })
            .then(()=>{
                  navigation.goBack()
            })
            .catch((error)=>alert(error))
      }

      return (
            <View style={styles.container}>
                    <Input 
                        placeholder='Enter The Name'  
                        value={input} 
                        onChangeText={text=>setInput(text)}
                        onSubmitEditing={createChat}
                        leftIcon={
                              <Icon name='wechat' type='antdesign' size={24} color='black' />
                        }
                     />
                     <Button disabled={!input} onPress={createChat} title='Press to Create' />
            </View>
      )
}

export default AddChatScreen

const styles = StyleSheet.create({
      container: {
            padding:10,
            backgroundColor: '#fff',
            justifyContent: 'center',
            height:'100%'
          },
})
