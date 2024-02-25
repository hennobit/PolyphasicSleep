import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomText from '../components/CustomText';
import NotificationService from '../services/NotificationService';
import RotatingCircle from '../components/RotatingCircle';

export default function Page() {
    useEffect(() => {
        NotificationService.registerForPushNotificationsAsync().then(() => {
            segments.forEach((segment) => {
                const notificationTime = calculateNotificationTime(segment.startAngle);
                scheduleNotification(notificationTime);
            });
        });
    }, []);

    function gradZuUhrzeit(grad: number): [number, number] {
        const stunden = Math.floor(grad / 15);
        const minuten = Math.round((grad % 15) / 0.25);

        return [stunden, minuten];
    }

    function gradZuUhrzeitString(grad: number): string {
        const stunden = Math.floor(grad / 15);
        const minuten = Math.round((grad % 15) / 0.25);
    
        const stundenStr = stunden.toString().padStart(2, '0');
        const minutenStr = minuten.toString().padStart(2, '0');
    
        return `${stundenStr}:${minutenStr}`;
    }

    function getNextSegment() {
        const currentDate = new Date()
        const aktuelleZeitGrad = (currentDate.getHours() * 60 + currentDate.getMinutes()) / 2;

        const differenzen = segments.map((segment) => {
            const startWinkel = segment.startAngle <= segment.endAngle ? segment.startAngle : segment.startAngle - 360;
            return Math.abs(aktuelleZeitGrad - startWinkel);
        });

        const indexNächstesSegment = differenzen.indexOf(Math.min(...differenzen));

        console.log(segments[indexNächstesSegment].startAngle)
        return gradZuUhrzeitString(segments[indexNächstesSegment].startAngle);
    }

    function calculateNotificationTime(startAngle: number): Date {
        const currentTime = new Date();
        const [hours, minutes] = gradZuUhrzeit(startAngle - 30 / 2); // 30 Minuten abziehen
        const notificationDate = new Date(
            currentTime.getFullYear(),
            currentTime.getMonth(),
            currentTime.getDate(),
            hours,
            minutes
        );

        // Falls die berechnete Zeit in der Vergangenheit liegt, plane für den nächsten Tag
        if (notificationDate < currentTime) {
            notificationDate.setDate(notificationDate.getDate() + 1);
        }

        return notificationDate;
    }

    function scheduleNotification(time: Date) {
        const trigger = new Date(time);
        NotificationService.scheduleNotification({
            content: {
                title: 'Erinnerung',
                body: 'Dein Segment beginnt bald.'
            },
            trigger
        });
    }

    // get infos out of database in the future
    const segments = [
        { color: 'red', endAngle: 90, startAngle: 37.5 },
    ];

    return (
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Text style={styles.headerText}>Today</Text>
            <CustomText overlayOpacity={60} style={{ marginLeft: 10, color: 'white' }}>
                Custom Schedule #1
            </CustomText>
            <RotatingCircle segments={segments} />
            <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 160 }}>
                <CustomText overlayOpacity={87} style={{ fontSize: 20, color: 'white' }}>
                    Next Phase at
                </CustomText>
                <CustomText overlayOpacity={87} style={{ fontSize: 32, color: 'white' }}>
                    {getNextSegment()}
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