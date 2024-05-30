import React, { useRef, useState } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { toStyleArray } from '../functions/rnFunc'


export default ({ onPress, style, hitSlop, children, disabled = false }) => {
    const opAnim = useRef(new Animated.Value(1)).current;
    const [dim, changeDim] = useState(0)
    let st = toStyleArray(style)
    const layout = (e) => {
        changeDim({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width
        })
    };
    const press = () => {
        opAnim.setValue(0.6)
        Animated.timing(opAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
        if (typeof onPress == 'function')
            onPress();
    }
    return (
        <Animated.View onLayout={layout} style={[{ opacity: opAnim, position: 'relative' }, ...st]}>
            <Pressable
                disabled={disabled}
                onPress={press}
                style={{ height: dim.height, width: dim.width, position: 'absolute', zIndex: 200 }}
                hitSlop={hitSlop} />

            {children}
        </Animated.View>

    );
};


