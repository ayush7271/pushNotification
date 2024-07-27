import React, { useEffect } from 'react';
import { View, Text, Button, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
 function App() {

  useEffect(() => {
    checkPermission();
    const unsubscribe = messaging().onTokenRefresh(token => {
      storeToken(token);
    });


messaging().onMessage(async remoteMessage => {
  console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', JSON.stringify(remoteMessage));
});

    return unsubscribe;
  }, []);

  const checkPermission = async () => {
    const authStatus = await messaging().hasPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
      getFcmToken();
    } catch (error) {
      // User has rejected permissions
      console.log('Permission rejected:', error);
    }
  };

  const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('Stored FCM token:', fcmToken);
    if (!fcmToken) {
      try {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('New FCM token generated:', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log('FCM token retrieval/generation error:', error);
      }
    }
  };

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('fcmToken', token);
    } catch (error) {
      console.log('Token storage error:', error);
    }
  };


  // useEffect(() => {
  //   // Request permission for notifications
  //   const requestPermission = async () => {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //     }
  //   };

  //   // Check if a notification caused the app to open
  //   messaging().getInitialNotification().then(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log('Notification caused app to open from quit state:', remoteMessage.notification);
  //       Alert.alert('Notification caused app to open from quit state:', JSON.stringify(remoteMessage.notification));
  //     }
  //   });

  //   // Handle background notifications
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('Notification caused app to open from background state:', remoteMessage.notification);
  //     Alert.alert('Notification caused app to open from background state:', JSON.stringify(remoteMessage.notification));
  //   });

  //   // Handle foreground notifications
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage.notification));
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.notification));
  //   });

  //   requestPermission();

  //   return unsubscribe;
  // }, []);

  useEffect(()=>{
    
  },[])

  return (
    <View>
      <Text>Firebase Cloud Messaging Demo</Text>
      <Button title="Check FCM Token" onPress={getFcmToken} />
    </View>
  );
}

export default App;