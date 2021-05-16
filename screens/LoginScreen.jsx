import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  ImageBackground, } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {

      const [email, setEmail]= useState('')
      const [password, setPassword] = useState('')

      useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((authUser)=>{
                  if(authUser){
                        navigation.replace('Home')
                  }
            })
             return unsubscribe
      }, [])

    const signIn=()=>{
            auth.signInWithEmailAndPassword(email, password)
            .catch((error)=>alert(error))
      }
      return (
            <KeyboardAvoidingView behavio='padding' style={styles.container}>
                  <ImageBackground source ={{
                  uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikbjB6H31lzZsHs9kL2r8GUbe3No3N9MBZA&usqp=CAU'}}      style={styles.image}>
                  <StatusBar style='light' />
                  <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2v7C3WafhNdW6Fhfbms6TWg5vyUSFALABPA&usqp=CAU"}} style={styles.avatar}   /> 
                  <View style={styles.inputContainer}>
                        <Input placeholder='Email' type='email' value={email} onChangeText={text=>setEmail(text)} />
                        <Input placeholder='password' secureTextEntry type='password' value={password} onChangeText={text=>setPassword(text)} onSubmitEditing={signIn} />
                  </View>
                  
                  <Button onPress={()=>navigation.navigate('Register')} containerStyle={styles.button} title='Register' type='outline'  />
                  <Button onPress={()=>navigation.navigate('ForgetPassword')}containerStyle={styles.button} title='Forget Password' />
                  <View style={{height:200}} />
                  </ImageBackground>
            </KeyboardAvoidingView>
      )
}

export default LoginScreen

const styles = StyleSheet.create({
      avatar:{
            width:100,
            height:100,
            borderRadius:100,
            paddingTop:10
      },
      button:{
            width:200,
            marginTop:10
      },
      buttonStyle:{
            width:200,
            marginTop:0
      },
      container: {
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
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
