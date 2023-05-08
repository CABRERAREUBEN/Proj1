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
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
            paddingRight:80,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width:460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            paddingRight:80,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
          <Field placeholder="Password" secureTextEntry={true} />
          <View
            style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200}}>
            <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
            </TouchableOpacity>
          </View>
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={() => alert("Logged In")} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <TouchableOpacity onPress={() => props.navigation.navigate("MapsLocation")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Maps Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
