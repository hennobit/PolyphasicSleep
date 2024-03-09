import React from 'react';
import { View, Text as NativeText } from 'react-native';
import Svg, { Circle, Path, G, Text } from 'react-native-svg';
import degreesToTimeString from '../utils/degreesToTimeString';

interface Segment {
    startAngle: number;
    endAngle: number;
    color?: string;
}

const calculatePath = (segment: Segment, radius: number, strokeWidth: number, rotation: number = -45, padding: number) => {
    const circleCenter = radius + strokeWidth / 2 + padding;
    const startRadians = ((segment.startAngle + rotation) * Math.PI) / 180;
    const endRadians = ((segment.endAngle + rotation) * Math.PI) / 180;
    const startX = circleCenter + radius * Math.cos(startRadians);
    const startY = circleCenter + radius * Math.sin(startRadians);
    const endX = circleCenter + radius * Math.cos(endRadians);
    const endY = circleCenter + radius * Math.sin(endRadians);
    const largeArcFlag = segment.endAngle - segment.startAngle <= 180 ? '0' : '1';

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
};

const renderTimeText = (
    angle: number,
    radius: number,
    strokeWidth: number,
    circleCenter: number,
    rotation: number,
    color: string
  ) => {
    const textRadius = radius + strokeWidth + 10;
    const textAngleRadians = ((angle + rotation) * Math.PI) / 180;
    const textX = circleCenter + textRadius * Math.cos(textAngleRadians);
    const textY = circleCenter + textRadius * Math.sin(textAngleRadians);
  
    const isRightSide = angle + rotation <= 90 || angle + rotation >= 270;
    const textAnchor = isRightSide ? 'start' : 'end';
  
    return (
      <Text
        x={textX}
        y={textY}
        fill={color}
        fontSize="13"
        textAnchor={textAnchor}
        alignmentBaseline="middle"
      >
        {degreesToTimeString(angle)}
      </Text>
    );
  };  

export default function SegmentedCircle({
    segments,
    radius = 32,
    strokeWidth = 5,
    backgroundColor = 'transparent',
    rounded = true,
    showTimes = false,
    padding = 0
}) {
    const containerSize = (radius + strokeWidth / 2) * 2 + padding * 2;
    const circleCenter = containerSize / 2;
    const rotation = -45;

    return (
        <View
            style={{
                width: containerSize,
                height: containerSize
            }}
        >
            <Svg>
                <G rotation={-45} originX={circleCenter} originY={circleCenter}>
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
                                d={calculatePath(segment, radius, strokeWidth, rotation, padding)}
                                stroke={segment.color ?? '#7559db'}
                                strokeWidth={strokeWidth}
                                fill='transparent'
                                strokeLinecap={rounded ? 'round' : 'square'}
                            />
                            {showTimes && (
                                <>
                                    {renderTimeText(segment.startAngle, radius, strokeWidth, circleCenter, rotation, segment.color)}
                                    {renderTimeText(segment.endAngle, radius, strokeWidth, circleCenter, rotation, segment.color)}
                                </>
                            )}
                        </G>
                    ))}
                </G>
            </Svg>
        </View>
    );
}
