// Generation of QR Code in React Native
// https://aboutreact.com/generation-of-qr-code-in-react-native/

// import React in our code
import React, {useState, useRef,useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import QRCode from 'react-native-qrcode-svg';
import RNFetchBlob from 'rn-fetch-blob';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { PermissionsAndroid } from 'react-native';


const App = () => {
  const [inputText, setInputText] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  let myQRCode = useRef();
  const viewRef = useRef();

  const shareQRCode = async () => {
    try {
      const uri = await captureRef(myQRCode, {
        format: 'png',
        quality: 0.8,
      });

      const options = {
        type: 'image/png',
        url: uri,
      };

      await Share.open(options);
    } catch (error) {
      console.error('Error sharing QR code:', error.message);
    }
  };  

  const saveQRCode = async () => {
    try {
      const uri = await captureRef(myQRCode, {
        format: 'png',
        quality: 0.8,
      });
      
      const destPath = `${RNFS.DocumentDirectoryPath}/qr_code.png`;
      await RNFS.copyFile(uri, destPath);
      await RNFS.scanFile(destPath);

      Alert.alert('QR code saved successfully!');
    } catch (error) {
      console.error('Error saving QR code:', error.message);
    }
  };
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
         Generate QR
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(inputText) => setInputText(inputText)}
          placeholder="Enter Any Value"
          value={inputText}
        />
        <ViewShot ref={viewRef}>
        <QRCode 
          getRef={(ref) => (myQRCode = ref)}
          // ref={myQRCode}
          //QR code value
          value={qrvalue ? qrvalue : 'NA'}
          //size of QR Code
          size={250}
          //Color of the QR Code (Optional)
          color="black"
          //Background Color of the QR Code (Optional)
          backgroundColor="white"
          //Center Logo size  (Optional)
          logoSize={30}
          //Center Logo margin (Optional)
          logoMargin={2}
          //Center Logo radius (Optional)
          logoBorderRadius={15}
          //Center Logo background (Optional)
          logoBackgroundColor="white"
          logo={require('./assets/ddx.png')}
        />
        </ViewShot>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setQrvalue(inputText)}>
          <Text style={styles.buttonTextStyle}>
            Generate QR Code
          </Text>
        </TouchableOpacity>
        <View style={styles.row}>
        <TouchableOpacity
          style={styles.Button}
          onPress={shareQRCode}>
          <Text style={styles.buttonTextStyle}>
            Share QR 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={saveQRCode}>
          <Text style={styles.buttonTextStyle}>
            Save QR
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    textAlign: 'center',
    marginRight: 5,
    marginVertical: 20,
    borderRadius: 20,
    width: 320,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  buttonStyle: {
    backgroundColor: 'deepskyblue',
   marginTop: 32,
   marginRight: 5,
   paddingVertical: 10,
   paddingHorizontal: 35,
   borderRadius: 20,
   paddingBottom: 17,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  Button: {
    backgroundColor: 'deepskyblue',
    marginTop: 32,
    marginRight: 10,
    marginLeft:-5,
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 20,
    paddingBottom: 17,
   },
   row: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft:20,
    },
}); 