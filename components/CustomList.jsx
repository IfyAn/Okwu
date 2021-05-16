import React, { useState, useEffect} from 'react'
import { View } from 'react-native'
import { StyleSheet , Text} from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { auth, db } from '../firebase'

const CustomList = ({id, chatName, enterChat}) => {
      const [chatMessages, setChatMessages] = useState([])

      useEffect(() => {
            const unsubscribe= db
            .collection('chats')
            .doc(id)
            .collection('messages').orderBy('timestamp', 'desc')
            .onSnapshot((snapshot)=>setChatMessages(
                  snapshot.docs.map((doc)=>doc.data(),
                  )
            ))
               return unsubscribe
      }, [])
      return (
            <ListItem key={id} onPress={()=>enterChat(id, chatName)} bottomDivider>
                <Avatar rounded source={{uri: chatMessages?.[0]?.photoURL || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'}} />
                <ListItem.Content>
                <ListItem.Title>
                              {chatName}
                        </ListItem.Title>
                        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                            {chatMessages?.[0]?.displayName} :{chatMessages?.[0]?.message} 
                        </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
      )
}

export default CustomList

const styles = StyleSheet.create({})
