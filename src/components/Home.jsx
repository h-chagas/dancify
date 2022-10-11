import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { setDoc, doc, updateDoc, getDocs, collection } from 'firebase/firestore';

import { firebaseConfig } from '../../config';

const Home = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
  });

  const addUser = () => {
    setDoc(doc(db, 'users', `${username}`), {
      username: username,
      email: email,
      password: password,
    });
    //navigation.navigate('CreateProfile')
  };

  const location = 'manchester';
  const danceStyle = 'salsa';
  const role = 'leader';
  const bio = 'hi';
  

  const patchUser = () => {
    const updateProfile = doc(db, "users", `${username}`);
    updateDoc(updateProfile, {
      location: location,
      danceStyle: danceStyle,
      role: role,
      bio: bio,
    });
    
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: 'Hugo',
    });
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Navbar />
      <View className="flex-1  justify-center items-center mt-5  space-y-5">
        <Text>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="username"
          required
          keyboardType="default"
        />
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="email"
          required
          keyboardType="default"
        />
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="password"
          required
          keyboardType="default"
        />
        <View>
          <Button
            title="Sign Up"
            onPress={addUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full-5"
          />
        </View>
      </View>
      
    </SafeAreaView>
  );
};


export default Home;
