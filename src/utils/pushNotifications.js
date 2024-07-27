import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('old fcm', fcmToken);
  if (!fcmToken) {
    try {
      let fcmToken=await messaging().getToken();
      if(fcmToken){
        console.log('new genetated token')
        await AsyncStorage.setItem('fcmToken',fcmToken)
      }
    } catch (e) {
      console.log(e);
    }
  }
};
