import React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}

export const LText = (props) => (
	<Text {...props} style={[{ fontSize: 20 }, props.style]} />
);

export const MonoLText = (props) => (
	<Text {...props} style={[{ fontSize: 20 , fontFamily: 'space-mono' }, props.style]} />
);

export const BLText = (props) => (
	<Text {...props} style={[{ fontSize: 20, fontWeight: "bold" }, props.style]} />
);

export const XLText = (props) => (
	<Text {...props} style={[{ fontSize: 25 }, props.style]} />
);

export const BXLText = (props) => (
	<Text {...props} style={[{ fontSize: 25, fontWeight: "bold" }, props.style]} />
);

export const XXLText = (props) => (
	<Text {...props} style={[{ fontSize: 30 }, props.style]} />
);

export const BXXLText = (props) => (
	<Text {...props} style={[{ fontSize: 30, fontWeight: "bold" }, props.style]} />
);

