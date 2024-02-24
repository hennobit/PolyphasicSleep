import { Slot } from 'expo-router';
import { View } from 'react-native';
import Navbar from '../components/Navbar';

export default function Layout() {
    return (
        <View style={{flex: 1, paddingTop: 42, paddingHorizontal: 16, backgroundColor: '#121212'}}>
            <Slot />
            <Navbar/>
        </View>
    );
}
