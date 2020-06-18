import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import React from 'react';

export default ({ text, nodeWidth, nodeHeight}) => (
	<G>
		<Rect
			x={0}
			y={0}
			width={nodeWidth}
			height={nodeHeight}
			stroke="green"
			strokeWidth="1"
			fill="grey"
		/>
		<Text x={2} y={2} fontSize={3} fill="white">{text}</Text>
	</G>
);