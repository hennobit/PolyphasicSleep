// RotatingCircle.js
import React, { useEffect, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import SegmentedCircle from './SegmentedCircle';

export default function RotatingCircle({ segments }) {
    const [rotation] = useState(new Animated.Value(0));

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const newRotationValue = -(hours * 15 + minutes * 0.25);

            rotateCircle(newRotationValue);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const rotateCircle = (toValue: number) => {
        const adjustedRotationValue = toValue;
    
        Animated.timing(rotation, {
            toValue: adjustedRotationValue,
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
                <SegmentedCircle rounded={false} radius={160} strokeWidth={10} segments={segments} backgroundColor='#212121'></SegmentedCircle>
            </Animated.View>
        </View>
    );
}
