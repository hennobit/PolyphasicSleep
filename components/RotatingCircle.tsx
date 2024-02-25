// RotatingCircle.js
import React, { useEffect, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import SegmentedCircle from './SegmentedCircle';

export default function RotatingCircle() {
    const [rotation] = useState(new Animated.Value(0));
    const [rotationValue, setRotationValue] = useState(0);

    function gradZuUhrzeit(grad: number): string {
        const stunden = Math.floor(grad / 15);

        const minuten = Math.round((grad % 15) / 0.25);
        const stundenStr = stunden < 10 ? '0' + stunden : stunden.toString();
        const minutenStr = minuten < 10 ? '0' + minuten : minuten.toString();

        return `${stundenStr}:${minutenStr}`;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const newRotationValue = hours * 15 + minutes * 0.25;

            setRotationValue(newRotationValue);
            rotateCircle(newRotationValue);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const rotateCircle = (toValue) => {
        Animated.timing(rotation, {
            toValue,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 32 }}>
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
                        { startAngle: 120, endAngle: 125 },
                        { startAngle: 345, endAngle: 52.5 },
                        { startAngle: 203.5, endAngle: 233.5 }
                    ]}
                ></SegmentedCircle>
            </Animated.View>
            <Text style={{ color: 'white', position: 'absolute', top: -50 }}>
                Rotation: {rotationValue.toFixed(2)}° Uhrzeit laut Rotation: {gradZuUhrzeit(rotationValue)}
            </Text>
        </View>
    );
}
