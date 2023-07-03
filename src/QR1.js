import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, ScrollView ,  TouchableOpacity,StyleSheet,ToastAndroid,} from 'react-native';
import RNFS from 'react-native-fs';
import QRCode from 'react-native-qrcode-svg';
import RNFetchBlob from 'rn-fetch-blob';
import ViewShot from 'react-native-view-shot';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import { PermissionsAndroid, Platform,Image } from 'react-native';

function generateRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomIndex = Math.floor(Math.random() * chars.length);
  return chars.charAt(randomIndex);
}

function generateUniqueCode(length) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += generateRandomChar();
  } 
  return code;
}

const SampleItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    generateSampleItems();
  }, []);

  // Function to generate sample items and save them to JSON
  const generateSampleItems = async () => {
    const sampleItems = [];

    for (let i = 0; i < 4; i++) {
      const uniqueCode = generateUniqueCode(12);
      const currentDate = new Date();
      const expirationDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days expiration

      const newItem = {
        id: uniqueCode,
        name: `Sample Item ${i + 1}`,
        price: Math.random() * 100,
        quantity: Math.floor(Math.random() * 5) + 1,
        createdDate: currentDate.toISOString(),
        expirationDate: expirationDate.toISOString(),
      };

      sampleItems.push(newItem);
    }

    const jsonContent = JSON.stringify(sampleItems, null, 2);

    try {
      await RNFS.writeFile(RNFS.DocumentDirectoryPath + '/sampleItems.json', jsonContent, 'utf8');
      console.log('Sample items created successfully!');
      setItems(sampleItems);
    } catch (error) {
      console.log('Error creating sample items:', error);
    }
  };
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
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          ToastAndroid.show('Storage permission denied', ToastAndroid.SHORT);
          return;
        }
      }

      const uri = await captureQRCode();
      if (uri) {
        const saveLocation = '/storage/emulated/0/DCIM/qrCode.png'; // Replace with your desired save location
        await saveImageToLocation(uri, saveLocation);
        const path = RNFetchBlob.fs.dirs.DCIMDir + '/qrcode.png';
        await RNFetchBlob.fs.writeFile(path, uri);
        if (Platform.OS === 'android') {
          await RNFetchBlob.fs.scanFile([{ path }]);
          await saveImageToLocation(uri, saveLocation);
        }
        ToastAndroid.show('QR code saved to specified location', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Failed to save QR code', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const captureQRCode = () => {
    return new Promise((resolve, reject) => {
      viewRef.current.capture().then((uri) => {
        resolve(uri);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  const saveImageToLocation = async (uri, saveLocation) => {
    try {
      const res = await RNFetchBlob.fs.cp(uri, saveLocation);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const generateQRCode = (id, createdDate, expirationDate) => {
    // Generate QR code based on unique code, created date, and expiration date
    const qrValue = `ID: ${id}\nCreated: ${createdDate}\nExpires: ${expirationDate}`;
    return (
        <ViewShot ref={viewRef} style={{ backgroundColor: 'white',}}>
      <QRCode
      getRef={(ref) => (myQRCode = ref)}
        value={qrValue}
        size={200}
        color="black"
        backgroundColor="white"
        logoSize={30}
        logoMargin={2}
        logoBorderRadius={15}
        logoBackgroundColor="white"
        logo={require('./assets/ddx.png')}
      />
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center',padding:15 }}>
         <Image
        source={require('./assets/ddx.png')} // or use a remote URL
        style={{ width: 50, height: 50 }}
      /> DataDynamix Inc. 
        </Text>
      </ViewShot>
      
    );
  };

  return (
    <ScrollView>
      <View>
        <Button title="Generate Sample Items" onPress={generateSampleItems} />
        {items.map((item) => (
          <View key={item.id}>
            <Text>ID: {item.id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Created Date: {item.createdDate}</Text>
            <Text>Expiration Date: {item.expirationDate}</Text>
            {new Date(item.expirationDate) > new Date() ? (
              <View>{generateQRCode(item.id, item.createdDate, item.expirationDate)}</View>
            ) : (
              <Text>QR code expired</Text>
            )}
            <TouchableOpacity style={styles.buttonStyle} onPress={shareQRCode}>
          <Text style={styles.buttonTextStyle}>Share QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={saveQRCode}>
          <Text style={styles.buttonTextStyle}>Save QR</Text>
        </TouchableOpacity>
          </View>
        ))}
      </View>
      
    </ScrollView>
  );
};
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
  });
export default SampleItems;
