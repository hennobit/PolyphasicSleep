import React from 'react';
import { Text, View } from 'react-native';

const CustomText = ({ children, overlayOpacity, style = {} }) => {
    return (
        <View style={{ 
            opacity: overlayOpacity / 100,
        }}>
            <Text style={style}>
                {children}
            </Text>
        </View>
    );
};

export default CustomText;
