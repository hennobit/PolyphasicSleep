import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Button, ScrollView, Modal, Alert } from 'react-native';
import WheelColorPicker from 'react-native-wheel-color-picker';
import CustomButton from '../../components/CustomButton';

export default function Page() {
    const [segments, setSegments] = useState([
        {
            name: '',
            startAngle: '',
            endAngle: '',
            color: 'red' // Default color
        }
    ]);

    const [colorPickerIndex, setColorPickerIndex] = useState(null);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState('red');

    const addSegment = () => {
        const newSegments = segments.map((segment) => {
            const startAngle = parseInt(segment.startAngle);
            const endAngle = parseInt(segment.endAngle);

            if (!isNaN(startAngle) && !isNaN(endAngle) && startAngle >= 0 && endAngle <= 360 && startAngle < endAngle) {
                return { ...segment, valid: true };
            } else {
                alert('Bitte geben Sie gültige Winkel für das Segment ein (0 bis 360).');
                return { ...segment, valid: false };
            }
        });

        if (newSegments.every((segment) => segment.valid)) {
            const newSegment = { name: '', startAngle: '', endAngle: '', color: 'red', valid: true };
            setSegments([...newSegments, newSegment]);
        }
    };

    const updateSegment = (index, field, value) => {
        const updatedSegments = [...segments];
        updatedSegments[index][field] = value;
        setSegments(updatedSegments);
    };

    const handleColorPicker = (index) => {
        setColorPickerIndex(index);
        setSelectedColor(segments[index].color);
        setColorPickerVisible(true);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const applyColorPicker = () => {
        const updatedSegments = [...segments];
        updatedSegments[colorPickerIndex].color = selectedColor;
        setSegments(updatedSegments);
        setColorPickerVisible(false);
    };

    const cancelColorPicker = () => {
        setColorPickerVisible(false);
    };

    const showDeleteConfirmation = (index: number) => {
        Alert.alert(
            'Delete',
            'Delete segment?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: () => {
                        const updatedSegments = [...segments];
                        updatedSegments.splice(index, 1);
                        setSegments(updatedSegments);
                    }
                }
            ],
            { cancelable: true }
        );
    };

    function saveSchedule() {
        const scheduleSegments = [];
    
        segments.forEach(segment => {
            const startAngle = parseInt(segment.startAngle);
            const endAngle = parseInt(segment.endAngle);
    
            if (!isNaN(startAngle) && !isNaN(endAngle) && startAngle >= 0 && endAngle <= 360 && startAngle < endAngle) {
                scheduleSegments.push({
                    startAngle,
                    endAngle,
                    color: segment.color
                });
            }
        });
    
        const scheduleObject = {
            name: 'Custom Schedule #1',
            segments: scheduleSegments
        };
    
        console.log(scheduleObject);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                {segments.map((segment, index) => (
                    <TouchableOpacity key={index} onLongPress={() => showDeleteConfirmation(index)}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder='Name'
                                placeholderTextColor={'#a9a9a9'}
                                value={segment.name}
                                onChangeText={(text) => updateSegment(index, 'name', text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='00:00'
                                placeholderTextColor={'#a9a9a9'}
                                keyboardType='numeric'
                                value={segment.startAngle}
                                onChangeText={(text) => updateSegment(index, 'startAngle', text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='23:59'
                                keyboardType='numeric'
                                value={segment.endAngle}
                                placeholderTextColor={'#a9a9a9'}
                                onChangeText={(text) => updateSegment(index, 'endAngle', text)}
                            />
                            <TouchableOpacity
                                style={[styles.colorPickerButton, { backgroundColor: segment.color }]}
                                onPress={() => handleColorPicker(index)}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
                <CustomButton title='Add' onPress={addSegment} style={{ marginTop: 14, backgroundColor: '#212121' }} />
                <Modal
                    visible={colorPickerVisible}
                    transparent={true}
                    animationType='fade'
                    onRequestClose={cancelColorPicker}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <WheelColorPicker onColorChange={handleColorChange} color={selectedColor} thumbSize={40} />
                            <View style={styles.buttonContainer}>
                                <CustomButton
                                    title='Cancel'
                                    onPress={cancelColorPicker}
                                    style={{ backgroundColor: 'grey' }}
                                />
                                <CustomButton
                                    title='Apply'
                                    onPress={applyColorPicker}
                                    style={{ backgroundColor: '#7559db' }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <CustomButton title='Speichern' onPress={() => saveSchedule()} style={{ bottom: 80, backgroundColor: '#7559db' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        color: '#ffffff',
        borderColor: '#212121',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        width: 100
    },
    colorPickerButton: {
        width: 49,
        height: 49,
        borderRadius: 8,
        marginRight: 10
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: '#212121',
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: -16,
        marginTop: 20
    }
});
