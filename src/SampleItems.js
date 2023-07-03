import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import RNFS from 'react-native-fs';
// Function to clear the JSON file
const clearSampleItems = async () => {
  try {
    const path = RNFS.DocumentDirectoryPath + '/sampleItems.json';
    await RNFS.unlink(path);
    setItems([]);
    console.log('Sample items cleared successfully!');
  } catch (error) {
    console.log('Error clearing sample items:', error);
  }
};
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

    for (let i = 0; i < 10; i++) {
      const uniqueCode = generateUniqueCode(12);
      const currentDate = new Date();
      const expirationDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days expiration

      if (items.length > 0) {
        const lastItem = items[items.length - 1];
        const lastExpirationDate = new Date(lastItem.expirationDate);
        const now = new Date();

        if (lastExpirationDate < now) {
          uniqueCode = generateUniqueCode(12);
          expirationDate = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);
        }
      }


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

  return (
    <View>
      <Button title="Generate Sample Items" onPress={generateSampleItems} />
      <Button title="Clear Sample Items" onPress={clearSampleItems} />
      {items.map((item) => (
        <View key={item.id}>
          <Text>ID: {item.id}</Text>
          <Text>Name: {item.name}</Text>
          <Text>Price: {item.price}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Created Date: {item.createdDate}</Text>
          <Text>Expiration Date: {item.expirationDate}</Text>
        </View>
      ))}
    </View>
  );
};

export default SampleItems;
