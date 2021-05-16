import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'

export default function ForgetScreen() {

      const [email, setEmail]= useState('')

      const forgot=()=>{

      }
      return (
               <KeyboardAvoidingView behavio='padding' style={styles.container}>
                  <ImageBackground source ={{
                  uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikbjB6H31lzZsHs9kL2r8GUbe3No3N9MBZA&usqp=CAU'}}
                   style={styles.image}>
                  <StatusBar style='light' />
                 <Text h3 style={{marginBottom:10}}>Forgotten Your Password, type in your email</Text>
                  <ScrollView style={styles.inputContainer}>
                        <Input placeholder='Email' type='Email' value={email} onChangeText={text=>setEmail(text)} onSubmitEditing={forgot} />
                  </ScrollView>
                  <Button raised onPress={register} containerStyle={styles.button} title='Register'  />
                  <View style={{height:20}} />
                  </ImageBackground>
            </KeyboardAvoidingView>
      )
}

const styles = StyleSheet.create({
      button:{
            width:200,
            marginTop:10
      },
      container: {
            flex: 1,
            backgroundColor: '#fff',
            //padding:10,
            justifyContent: 'center',
            //alignItems:'center',
                   
          },
          image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            alignItems: 'center',
          },
          inputContainer:{
                width:300,
          },
})
