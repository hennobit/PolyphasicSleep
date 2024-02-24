import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

export default function SegmentedCircle({
    segments,
    radius = 32,
    strokeWidth = 5,
    backgroundColor = '#212121',
    rounded = true
}) {
    const circleCenter = radius + strokeWidth / 2;
    const rotation = -45;

    // Funktion zum Erstellen von Pfaden für ein fehlendes Segment
    const createMissingSegmentPath = (startAngle, endAngle) => {
        const startRadians = ((startAngle + rotation) * Math.PI) / 180;
        const endRadians = ((endAngle + rotation) * Math.PI) / 180;
        const startX = circleCenter + radius * Math.cos(startRadians);
        const startY = circleCenter + radius * Math.sin(startRadians);
        const endX = circleCenter + radius * Math.cos(endRadians);
        const endY = circleCenter + radius * Math.sin(endRadians);
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
        return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
    };

    // Array zum Speichern von allen Segment-Pfaden
    let allPaths = [];

    // Funktion zum Erstellen eines Hintergrundsegments für einen bestimmten Bereich
    function createBackgroundSegment(startAngle, endAngle, color) {
        const pathData = createMissingSegmentPath(startAngle, endAngle);
        allPaths.push({ pathData, color });
    }

    // Durchlaufen aller Winkel im Kreis
    for (let angle = 0; angle < 360; angle++) {
        // Überprüfen, ob ein vorhandenes Segment den aktuellen Winkel abdeckt
        const coveredSegment = segments.find((segment) => {
            return angle >= segment.startAngle && angle <= segment.endAngle;
        });

        // Falls ein vorhandenes Segment den aktuellen Winkel abdeckt, die Farbe des Segments verwenden
        if (coveredSegment) {
            createBackgroundSegment(angle, angle + 1, coveredSegment.color);
        } else {
            // Andernfalls die Hintergrundfarbe verwenden
            createBackgroundSegment(angle, angle + 1, backgroundColor);
        }
    }

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
                        fill='transparent'
                        strokeWidth={strokeWidth}
                    />
                    {allPaths.map((segment, index) => (
                        <Path
                            key={index}
                            d={segment.pathData}
                            stroke={segment.color}
                            strokeWidth={strokeWidth}
                            fill='transparent'
                            strokeLinecap={rounded ? 'round' : 'square'}
                        />
                    ))}
                </G>
            </Svg>
        </View>
    );
}
