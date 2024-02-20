import messaging from '@react-native-firebase/messaging';

const initializeFirebaseMessaging = async () => {
    try {
        await messaging().registerDeviceForRemoteMessages();
        const premissionGranted = await messaging().requestPermission();
        if (premissionGranted) {
        console.log('Firebase messaging is ready to go');
        const token = await messaging().getToken();
        if (token) {
            console.log('Firebase token', token);
            return token;
        } else {
            console.log('Firebase token not found');
            return '';
        }
        } else {
        console.log('Firebase messaging permission not granted');
        return '';
        }
    } catch (error) {
        console.error('Error initializing Firebase messaging:', error);
        return '';
    }
};

export default initializeFirebaseMessaging;