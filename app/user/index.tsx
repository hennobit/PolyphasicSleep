import React from 'react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SegmentedCircle from '../../components/SegmentedCircle';
import CustomText from '../../components/CustomText';
import { router } from 'expo-router';

const segments = [
    { startAngle: 120, endAngle: 125 },
    { startAngle: 345, endAngle: 52.5 },
    { startAngle: 217.5, endAngle: 222.5 }
];

const navigateToSchedules = () => {
    router.push('/schedules')
};

export default function Page() {
    return (
        <TouchableOpacity onPress={navigateToSchedules}>
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: 6,
                        paddingTop: 20
                    }}
                >
                    <View style={{ marginLeft: 8 }}>
                        <CustomText overlayOpacity={100} style={styles.headerText}>
                            Everyman 2
                        </CustomText>
                        <CustomText overlayOpacity={60} style={{ color: 'white' }}>
                            Your Schedule
                        </CustomText>
                    </View>
                    <SegmentedCircle radius={45} strokeWidth={5} rounded={false} segments={segments}></SegmentedCircle>
                </View>
                <View
                    style={{
                        borderBottomWidth: 3,
                        borderBottomColor: '#212121',
                        marginTop: 11,
                        width: '100%',
                        marginLeft: -5
                    }}
                ></View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    list: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 16
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white'
    }
});
