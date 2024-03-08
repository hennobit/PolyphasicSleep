import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomText from '../components/CustomText';
import NotificationService from '../services/NotificationService';
import RotatingCircle from '../components/Clock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScheduleSegment } from '../interfaces/ScheduleSegment';
import degreesToTime from '../utils/degreesToTime';
import degreesToTimeString from '../utils/degreesToTimeString';

export default function Page() {
    const [segments, setSegments] = useState([] as ScheduleSegment[]);

    useEffect(() => {
        getSegments();
        NotificationService.registerForPushNotificationsAsync().then(() => {
            segments.forEach((segment) => {
                const notificationTime = calculateNotificationTime(segment.startAngle);
                scheduleNotification(notificationTime);
            });
        });
    }, []);

    function getNextSegment(): string {
        const currentDate = new Date();
        // Calculate the current time in degrees
        const currentTimeDegree: number = currentDate.getHours() * 15 + currentDate.getMinutes() * 0.25;

        // Calculate the difference in degrees between each segment's startAngle and the current time
        const differences: number[] = segments.map((segment) => segment.startAngle - currentTimeDegree);

        const nonNegativeDifferences: number[] = differences.filter((diff) => diff >= 0);

        let minDifference: number;
        let indexNextSegment: number;

        if (nonNegativeDifferences.length > 0) {
            // If there are segments later today, find the one with the minimum positive difference
            minDifference = Math.min(...nonNegativeDifferences);
            indexNextSegment = differences.indexOf(minDifference);
        } else {
            // If all segments are in the past, simulate them being on the next day by adding 360 (a full circle/24 hours in degrees)
            const positiveDifferences: number[] = differences.map((diff) => diff + 360);
            minDifference = Math.min(...positiveDifferences);
            indexNextSegment = positiveDifferences.indexOf(minDifference);
        }

        return degreesToTimeString(segments[indexNextSegment].startAngle);
    }

    function calculateNotificationTime(startAngle: number): Date {
        const currentTime = new Date();
        const [hours, minutes] = degreesToTime(startAngle - 30 / 2); // notification 30 minutes before next phase
        const notificationDate = new Date(
            currentTime.getFullYear(),
            currentTime.getMonth(),
            currentTime.getDate(),
            hours,
            minutes
        );

        // if the time is in the past, plan for the next day
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

    const getSegments = async () => {
        try {
            const storedSegments = await AsyncStorage.getItem('ACTIVE_SCHEDULE');
            const parsedSegments = JSON.parse(storedSegments);
            if (parsedSegments && parsedSegments.segments) {
                const convertedSegments = parsedSegments.segments.map((segment) => ({
                    ...segment,
                    startAngle: parseInt(segment.startAngle, 10),
                    endAngle: parseInt(segment.endAngle, 10)
                }));
                console.log(convertedSegments);
                setSegments(convertedSegments);
            }
        } catch (error) {
            console.error('Error loading segments from storage ja genau hier:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
            {segments.length === 0 ? (
                <Text>No schedule selected</Text>
            ) : (
                <>
                    <Text style={styles.headerText}>Today</Text>
                    <CustomText overlayOpacity={60} style={{ marginLeft: 10, color: 'white' }}>
                        Custom
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
                </>
            )}
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
