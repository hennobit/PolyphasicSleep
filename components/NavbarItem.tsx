import React from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';
import CustomText from './CustomText';

interface NavbarItemProps {
    href: string;
    icon: JSX.Element;
    text: string;
    textColor: string;
}

const NavbarItem = ({ href, icon, text, textColor = '#e1e1e1' }) => {
    return (
        <Link href={href}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {icon}
                <CustomText  overlayOpacity={100} style={{color: textColor}}>{text}</CustomText>
            </View>
        </Link>
    );
};

export default NavbarItem;
