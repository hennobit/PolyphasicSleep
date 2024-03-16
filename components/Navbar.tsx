import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import NavbarItem from './NavbarItem';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const Navbar = () => {
    const navigation = useNavigation();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        navigation.addListener('state', () => {
            const path = navigation.getState().routes[navigation.getState().index]?.name;
            setCurrentPath(path);
        });

        // initial
        setCurrentPath(navigation.getState().routes[navigation.getState().index]?.name);
    }, [navigation]);

    const activeColor = '#7559db';
    const inactiveColor = '#e1e1e1';

    const homeIconColor = currentPath === 'index' ? activeColor : inactiveColor;
    const userIconColor = currentPath === 'user/index' ? activeColor : inactiveColor;

    return (
        <View style={styles.container}>
            <NavbarItem
                href='/'
                icon={<MaterialCommunityIcons name='calendar-check-outline' size={24} color={homeIconColor} />}
                text='Home'
                textColor={homeIconColor}
            />
            <NavbarItem
                href='/user'
                icon={<FontAwesome name='user-o' size={24} color={userIconColor} />}
                text='Me'
                textColor={userIconColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '109%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#212121',
        paddingVertical: 9,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    }
});

export default Navbar;
