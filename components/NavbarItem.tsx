import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

interface NavbarItemProps {
    href: string;
    icon: JSX.Element;
    text: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ href, icon, text }) => {
    return (
        <Link href={href}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {icon}
                <Text>{text}</Text>
            </View>
        </Link>
    );
};

export default NavbarItem;
