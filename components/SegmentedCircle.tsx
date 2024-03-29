import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, G, Text, Rect } from 'react-native-svg';
import degreesToTimeString from '../utils/degreesToTimeString';
import { Segment } from '../interfaces/Segment';

const calculatePath = (
    segment: Segment,
    radius: number,
    strokeWidth: number,
    rotation: number = -45,
    padding: number
) => {
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

const renderTimeText = (angle: number, radius: number, strokeWidth: number, circleCenter: number, color: string) => {
    const rotation = -45;
    const textRadius = radius + strokeWidth + 10;
    const textAngleRadians = ((angle + rotation) * Math.PI) / 180;
    const textX = circleCenter + textRadius * Math.cos(textAngleRadians);
    const textY = circleCenter + textRadius * Math.sin(textAngleRadians);
    const isRightSide = angle + rotation <= 90 || angle + rotation >= 270;
    const rotationAngle = isRightSide ? angle + rotation : angle + rotation + 180; // Adjust rotation angle based on text position
    const textTransform = `rotate(${rotationAngle}, ${textX}, ${textY})`; // Construct rotate transformation

    const textAnchor = isRightSide ? 'start' : 'end';

    return (
        <Text
            x={textX}
            y={textY}
            fill={color}
            fontSize='13'
            textAnchor={textAnchor}
            alignmentBaseline='middle'
            transform={textTransform}
        >
            {degreesToTimeString(angle)}
        </Text>
    );
};

const renderLegend = (segment: Segment, index: number, total: number, circleCenter: number) => {
    const squareSize = 15;
    const fontSize = 15;
    const xOffset = circleCenter - 15;
    const yOffset = circleCenter + (index - total / 2) * total * 10;
    return (
        <G key={`legend_${index}`}>
            <Rect
                x={xOffset - squareSize / 2}
                y={yOffset - squareSize / 2}
                width={squareSize}
                height={squareSize}
                fill={segment.color}
            />
            <Text
                x={xOffset + squareSize / 2 + 5}
                y={yOffset}
                fill='#fff'
                fontSize={fontSize}
                textAnchor='start'
                alignmentBaseline='middle'
            >
                {segment.title}
            </Text>
        </G>
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
                <G rotation={rotation} originX={circleCenter} originY={circleCenter}>
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
                                    {renderTimeText(
                                        segment.startAngle,
                                        radius,
                                        strokeWidth,
                                        circleCenter,
                                        segment.color
                                    )}
                                    {renderTimeText(segment.endAngle, radius, strokeWidth, circleCenter, segment.color)}
                                    {renderLegend(segment, index, segments.length, circleCenter)}
                                </>
                            )}
                        </G>
                    ))}
                </G>
            </Svg>
        </View>
    );
}
