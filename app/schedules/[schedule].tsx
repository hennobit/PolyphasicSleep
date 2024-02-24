import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Page() {
    const local = useLocalSearchParams();

    return (
        <View>
            <Text>Local: {local.schedule}</Text>
        </View>
    );
}
