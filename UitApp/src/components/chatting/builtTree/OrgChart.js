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

/* Use this if you are using Expo
import * as Svg from 'react-native-svg';
const { Circle, Rect } = Svg;
*/

import React from 'react';

const getNumberTreeLeave = (node) => {
	if( !node.nodes || node.nodes.length < 0) {
		return 1;
	}
	return node.nodes.reduce((total, child) => total + getNumberTreeLeave(child), 0);
} 

const getNumberTreeFloor = (node, level = 1) => {
	if( !node.nodes || node.nodes.length < 0) {
		return level + 1;
	}
	return Math.max(...node.nodes.map(child => getNumberTreeLeave(child, level + 1)));
} 

const calcTreeWidth = (numberNode, nodeWidth, nodeSpace) => {
	return numberNode * nodeWidth + (numberNode - 1 ) * nodeSpace;
}

const getTreeWidth = (tree, nodeWidth, nodeSpace) => {
	const numberLeaves = getNumberTreeLeave(tree);
	return calcTreeWidth(numberLeaves, nodeWidth, nodeSpace);
}

const getTreeHeight = (tree, nodeHeight, floorHeight) => {
	const numberFloor = getNumberTreeFloor(tree);
	return calcTreeWidth(numberFloor, nodeHeight, floorHeight);
}

export default class OrgChart extends React.Component {
	state = { 
		canvasWidth: this.getTreeWidth(this.props),
		canvasHeight: this.getTreeHeight(this.props)
	}

	getTreeWidth(props) {
		const { nodeWidth, nodeHeight, floorHeight, nodeSpace, tree } = props;
		return getTreeWidth(tree, nodeWidth, nodeSpace);
	}

	getTreeHeight(props) {
		const { nodeWidth, nodeHeight, floorHeight, nodeSpace, tree } = props;
		return getTreeHeight(tree, nodeHeight, floorHeight);
	}

	componentWillReceiveProps(nexProps) {
		const canvasWidth = this.getTreeWidth(nexProps);
		const canvasHeight = getTreeHeight(nexProps);
		this.setState({ 
			canvasWidth,
			canvasHeight
		});
	}

	renderNode({ node, level, index, offsetX }) {
		const {  canvasWidth } = this.state;
		const { nodeWidth, nodeHeight, floorHeight, nodeSpace, NodeComponent } = this.props;
		const { nodes } = node;
		const numberChild = nodes && nodes.length || 0;
		const branchWidth = getTreeWidth(node, nodeWidth, nodeSpace);
		return (
			<G x={ (index * (branchWidth + nodeSpace))} y={0} >
			{level > 0 && 
				<G>
					<Line
					stroke="red"
					strokeWidth="1"
					x1={Math.floor(nodeWidth/2)}
					y1={0}
					x2={Math.floor(nodeWidth/2)}
					y2={floorHeight}
					/>
				</G>
			}
			<G x={0} y={floorHeight}>
				<NodeComponent {...node} {...this.props}/>
			</G>
			<G y={nodeHeight}>
				{numberChild > 0 &&
					<Line
					stroke="red"
					strokeWidth="1"
					x1={Math.floor(nodeWidth/2)}
					y1={floorHeight}
					x2={Math.floor(nodeWidth/2)}
					y2={2*floorHeight}
				/>}
				{numberChild > 1 && 
					<Line
						stroke="red"
						strokeWidth="1"
						x1={0}
						y1={2*floorHeight}
						x2={branchWidth}
						y2={2*floorHeight}
					/>
				}
			</G>
			<G y={nodeHeight + 2*floorHeight}>
				{nodes && nodes.map((node, index) => this.renderNode({ node, index, level: level + 1 }))}
			</G>
		</G>
		);
	}
	
  render() {
		const { canvasWidth, canvasHeight } = this.state;
		const { tree, NodeComponent, nodeWidth, nodeSpace, nodeHeight, floorHeight } = this.props;
		const { nodes } = tree;
		return (
        <Svg height="80%" width="80%" viewBox={`0 0 ${2*canvasWidth} ${2*canvasHeight}`}>
          {(nodes || []).map((node, index) => this.renderNode({ node, index, level: 0, offsetX: 0 }))}
        </Svg>
    );
  }
}