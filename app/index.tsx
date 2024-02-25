// Page.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomText from '../components/CustomText'; // Pfad anpassen
import CustomButton from '../components/CustomButton'; // Pfad anpassen
import NotificationService from '../services/NotificationService'; // Pfad anpassen
import RotatingCircle from '../components/RotatingCircle'; // Pfad anpassen und sicherstellen, dass der Pfad korrekt ist

export default function Page() {
    useEffect(() => {
        NotificationService.registerForPushNotificationsAsync().then(() => {
            NotificationService.sendPushNotification();
        });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Text style={styles.headerText}>Today</Text>
            <CustomText overlayOpacity={60} style={{ marginLeft: 10, color: 'white' }}>
                Everyman 2
            </CustomText>
            <RotatingCircle />
            <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 160 }}>
                <CustomText overlayOpacity={87} style={{ fontSize: 20, color: 'white' }}>
                    Next Phase at
                </CustomText>
                <CustomText overlayOpacity={87} style={{ fontSize: 32, color: 'white' }}>
                    18:20
                </CustomText>
            </View>
            <View
                style={{
                    position: 'absolute',
                    top: '23.9%',
                    left: '50%',
                    width: 2,
                    height: 40,
                    backgroundColor: '#fff',
                    zIndex: 1
                }}
            ></View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10
    }
});
