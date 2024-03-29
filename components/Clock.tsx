// RotatingCircle.js
import React, { useEffect, useState } from 'react';
import { Animated, Easing, View, TouchableWithoutFeedback } from 'react-native';
import SegmentedCircle from './SegmentedCircle';

export default function Clock({ segments }) {
    const [rotation] = useState(new Animated.Value(0));
    const [showTimes, setShowTimes] = useState(false);

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
            <View
                style={{
                    position: 'absolute',
                    top: '22.5%',
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
                <TouchableWithoutFeedback onPressIn={() => setShowTimes(true)} onPressOut={() => setShowTimes(false)}>
                    <View>
                    <SegmentedCircle
                        rounded={false}
                        radius={150}
                        strokeWidth={10}
                        segments={segments}
                        showTimes={showTimes}
                        backgroundColor='#212121'
                        padding={99}
                    ></SegmentedCircle>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    );
}
