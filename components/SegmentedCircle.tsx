import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

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

export default function SegmentedCircle({
    segments,
    radius = 32,
    strokeWidth = 5,
    backgroundColor = 'transparent',
    rounded = true,
}: SegmentedCircleProps) {
    const circleCenter = radius + strokeWidth / 2;
    const rotation = -45;

    return (
        <View
            style={{
                width: (radius + strokeWidth / 2) * 2,
                height: (radius + strokeWidth / 2) * 2
            }}
        >
            <Svg>
                <G rotation={rotation} originX={circleCenter} originY={circleCenter}>
                    <Circle
                        cx={circleCenter}
                        cy={circleCenter}
                        r={radius}
                        fill="transparent"
                        stroke={backgroundColor}
                        strokeWidth={strokeWidth}
                    />
                    {segments.map((segment, index) => (
                        <Path
                            key={index}
                            d={calculatePath(segment, radius, strokeWidth, rotation)}
                            stroke={segment.color ?? '#7559db'}
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeLinecap={rounded ? 'round' : 'square'}
                        />
                    ))}
                </G>
            </Svg>
        </View>
    );
}
