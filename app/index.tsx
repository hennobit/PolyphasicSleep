import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';
import SegmentedCircle from '../components/SegmentedCircle';

export default function Page() {
    const [rotation] = useState(new Animated.Value(0));

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const totalMinutes = hours * 60 + minutes;
            const rotationValue = (totalMinutes / (12 * 60)) * 360; // 12 Stunden * 60 Minuten
            rotateCircle(rotationValue);
            console.log(rotationValue);
        }, 1000); // Aktualisiere alle Sekunde

        return () => clearInterval(interval);
    }, []);

    const rotateCircle = (toValue: number) => {
        Animated.timing(rotation, {
            toValue,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.headerText}>Heute</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 32 }}>
                <View
                    style={{
                        position: 'absolute',
                        top: 158,
                        left: '50%',
                        width: 2,
                        height: 40,
                        backgroundColor: '#fff',
                        zIndex: 1
                    }}
                ></View>
                <Animated.View
                    style={{
                        transform: [
                            { rotate: rotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }
                        ]
                    }}
                >
                    <SegmentedCircle
                        rounded={false}
                        radius={160}
                        strokeWidth={10}
                        segments={[
                            { startAngle: 1, endAngle: 90, color: 'red' },
                            { startAngle: 180, endAngle: 270, color: 'green' },
                        ]}
                    ></SegmentedCircle>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        margin: 10
    }
});
