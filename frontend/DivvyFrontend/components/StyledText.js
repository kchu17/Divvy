import React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}

export const LText = (props) => (
	<Text {...props} style={[{ fontSize: 20, color: "#3d7080" }, props.style]} />
);

export const MonoLText = (props) => (
	<LText {...props} style={[{ fontFamily: 'space-mono' }, props.style]} />
);

export const BLText = (props) => (
	<LText {...props} style={[{ fontWeight: "bold" }, props.style]} />
);

export const XLText = (props) => (
	<LText {...props} style={[{ fontSize: 25 }, props.style]} />
);

export const BXLText = (props) => (
	<XLText {...props} style={[{ fontWeight: "bold" }, props.style]} />
);

export const XXLText = (props) => (
	<LText {...props} style={[{ fontSize: 30 }, props.style]} />
);

export const BXXLText = (props) => (
	<XXLText {...props} style={[{ fontSize: 30, fontWeight: "bold" }, props.style]} />
);

