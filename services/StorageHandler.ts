import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ScheduleSegment {
    startAngle: number;
    endAngle: number;
    color?: string;
}

export interface SleepModelButton {
    name: string;
    segments: ScheduleSegment[];
}

const sleepModelButtons: SleepModelButton[] = [
    {
        name: 'Biphasic',
        segments: [
            { startAngle: 322.5, endAngle: 12.5 },
            { startAngle: 77.5, endAngle: 127.5 }
        ]
    },

    {
        name: 'Everyman',
        segments: [
            { startAngle: 120, endAngle: 125 },
            { startAngle: 345, endAngle: 52.5 },
            { startAngle: 217.5, endAngle: 222.5 }
        ]
    },

    {
        name: 'Dual Core',
        segments: [
            { startAngle: 322.5, endAngle: 12.5 },
            { startAngle: 87.5, endAngle: 112.5 },
            { startAngle: 210, endAngle: 215 }
        ]
    },
    {
        name: 'Tri Core',
        segments: [
            { startAngle: 337.5, endAngle: 0 },
            { startAngle: 97.5, endAngle: 120 },
            { startAngle: 217.5, endAngle: 240 }
        ]
    },

    {
        name: 'Non-Reducing',
        segments: [
            { startAngle: 337.5, endAngle: 7.5 },
            { startAngle: 67.5, endAngle: 97.5 },
            { startAngle: 155, endAngle: 185 },
            { startAngle: 255, endAngle: 285 }
        ]
    },

    {
        name: 'Flexible',
        segments: [{ startAngle: 1, endAngle: 360 }]
    },

    {
        name: 'Nap-Only',
        segments: [
            { startAngle: 0, endAngle: 5 },
            { startAngle: 60, endAngle: 65 },
            { startAngle: 120, endAngle: 125 },
            { startAngle: 180, endAngle: 185 },
            { startAngle: 240, endAngle: 245 },
            { startAngle: 300, endAngle: 305 }
        ]
    },

    {
        name: 'Core-Only',
        segments: [
            { startAngle: 345, endAngle: 60 },
            { startAngle: 195, endAngle: 217.5 }
        ]
    },
    {
        name: 'Custom',
        segments: []
    }
];

const saveSleepModelButtons = async () => {
    try {
        await AsyncStorage.setItem('sleepModelButtons', JSON.stringify(sleepModelButtons));
        console.log('Sleep-Model-Buttons successfully saved.');
    } catch (error) {
        console.error('Error saving Sleep-Model-Buttons:', error);
    }
};

const loadSleepModelButtons = async () => {
    try {
        const buttonsString = await AsyncStorage.getItem('sleepModelButtons');
        return buttonsString ? JSON.parse(buttonsString) : null;
    } catch (error) {
        console.error('Error loading Sleep-Model-Buttons:', error);
        return null;
    }
};

saveSleepModelButtons();

export { saveSleepModelButtons, loadSleepModelButtons };
