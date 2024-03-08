import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, G, Line, Text } from 'react-native-svg';
import degreesToTimeString from '../utils/degreesToTimeString';

interface Segment {
    startAngle: number;
    endAngle: number;
    color?: string;
}

interface SegmentedCircleProps {
    segments: Segment[];
    radius?: number;
    strokeWidth?: number;
    backgroundColor?: string;
    rounded?: boolean;
    showTimes?: boolean;
}

const calculatePath = (segment: Segment, radius: number, strokeWidth: number, rotation: number = -45) => {
    const circleCenter = radius + strokeWidth / 2;
    const startRadians = ((segment.startAngle + rotation) * Math.PI) / 180;
    const endRadians = ((segment.endAngle + rotation) * Math.PI) / 180;
    const startX = circleCenter + radius * Math.cos(startRadians);
    const startY = circleCenter + radius * Math.sin(startRadians);
    const endX = circleCenter + radius * Math.cos(endRadians);
    const endY = circleCenter + radius * Math.sin(endRadians);
    const largeArcFlag = segment.endAngle - segment.startAngle <= 180 ? '0' : '1';

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
};

const calculateLineEndOutward = (angle: number, radius: number, strokeWidth: number, lineLength: number = 15) => {
    const circleCenter = radius + strokeWidth / 2;
    const radians = (angle * Math.PI) / 180;
    const lineEndX = circleCenter + (radius + lineLength) * Math.cos(radians);
    const lineEndY = circleCenter + (radius + lineLength) * Math.sin(radians);
    return { endX: lineEndX, endY: lineEndY };
};

export default function SegmentedCircle({
    segments,
    radius = 32,
    strokeWidth = 5,
    backgroundColor = 'transparent',
    rounded = true,
    showTimes = false
}: SegmentedCircleProps) {
    const containerSize = (radius + strokeWidth / 2) * 2;
    const circleCenter = radius + strokeWidth / 2;
    const rotation = -45;

    return (
        <View
            style={{
                width: containerSize,
                height: containerSize
            }}
        >
            <Svg viewBox={`0 0 ${containerSize} ${containerSize}`}>
                <G rotation={0} originX={circleCenter} originY={circleCenter}>
                    <Circle
                        cx={circleCenter}
                        cy={circleCenter}
                        r={radius}
                        fill='transparent'
                        stroke={backgroundColor}
                        strokeWidth={strokeWidth}
                    />
                    {segments.map((segment, index) => (
                        <G key={index}>
                            <Path
                                d={calculatePath(segment, radius, strokeWidth, rotation)}
                                stroke={segment.color ?? '#7559db'}
                                strokeWidth={strokeWidth}
                                fill='transparent'
                                strokeLinecap={rounded ? 'round' : 'square'}
                            />
                            {showTimes ? <G rotation={rotation} originX={circleCenter} originY={circleCenter}>
                                <Text
                                    key={index + segment.startAngle}
                                    x={calculateLineEndOutward(segment.startAngle, radius, strokeWidth).endX - 20}
                                    y={calculateLineEndOutward(segment.startAngle, radius, strokeWidth).endY}
                                    fill={segment.color ?? '#000'}
                                    fontSize={15}
                                    transform={`rotate(${segment.startAngle + 90} ${
                                        calculateLineEndOutward(segment.startAngle, radius, strokeWidth).endX
                                    } ${calculateLineEndOutward(segment.startAngle, radius, strokeWidth).endY})`}
                                >
                                    {degreesToTimeString(segment.startAngle)}
                                </Text>
                                <Text
                                    key={index + segment.endAngle}
                                    x={calculateLineEndOutward(segment.endAngle, radius, strokeWidth).endX - 10}
                                    y={calculateLineEndOutward(segment.endAngle, radius, strokeWidth).endY}
                                    fill={segment.color ?? '#000'}
                                    fontSize={15}
                                    transform={`rotate(${segment.endAngle + 90} ${
                                        calculateLineEndOutward(segment.endAngle, radius, strokeWidth).endX
                                    } ${calculateLineEndOutward(segment.endAngle, radius, strokeWidth).endY})`}
                                >
                                    {degreesToTimeString(segment.endAngle)}
                                </Text>
                            </G> : <></>}
                        </G>
                    ))}
                </G>
            </Svg>
        </View>
    );
}
