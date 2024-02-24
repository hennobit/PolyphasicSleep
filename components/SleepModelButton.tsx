import { View } from 'react-native';
import SegmentedCircle from './SegmentedCircle';
import CustomText from './CustomText';
import { Link } from 'expo-router';

export default function SleepModelButton({ name, segments }) {
    return (
        <Link href={`/schedules/${name}`} style={{margin: 8}}>
            <View
                style={{
                    width: 111,
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#121212',
                    borderRadius: 8,
                    padding: 8
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: 8
                    }}
                />
                <SegmentedCircle segments={segments}></SegmentedCircle>
                <CustomText
                    overlayOpacity={60}
                    style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#dedede',
                        marginTop: 8
                    }}
                >
                    {name}
                </CustomText>
            </View>
        </Link>
    );
}
