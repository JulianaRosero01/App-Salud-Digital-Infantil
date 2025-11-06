// app/index.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkChild = async () => {
      try {
        const value = await AsyncStorage.getItem('hasChild');
        if (value === 'true') {
          router.replace('/home');
        } else {
          router.replace('/welcome');
        }
      } catch (error) {
        console.log('Error leyendo AsyncStorage:', error);
        router.replace('/welcome');
      } finally {
        setLoading(false);
      }
    };

    checkChild();
  }, []);

  // Pantalla de carga breve mientras decide
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bde4eeff' }}>
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
}
