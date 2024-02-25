import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavbarItem from './NavbarItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Navbar = () => {
    return (
        <View style={styles.container}>
            <NavbarItem
                href='/'
                icon={<MaterialCommunityIcons name='calendar-check-outline' size={24} color='#7559db' />}
                text='Home'
                textColor='#7559db'
            />
            <NavbarItem
                href='/user'
                icon={<FontAwesome name="user-o" size={24} color="#e1e1e1" />}
                text='Me'
            ></NavbarItem>
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
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default Navbar;
