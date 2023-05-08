import React from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';

const Login = (props) => {
  return (
    <Background>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize:40,
            fontWeight: 'bold',
            marginVertical: 20,
            paddingRight:80,
          }}>
          Forgot Password
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width:460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            paddingRight:80,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, color: darkGreen, fontWeight: 'bold'}}>
          Retrieve Your Account
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Enter Your Email Address
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
         
          <View
            style={{alignItems: 'flex-end', width: '78%',flexDirection :'row',justifyContent: "center" , paddingRight: 20, marginBottom: 200}}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Forgot Password" Press={() => alert("Link has been Sent to Your Email")} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
