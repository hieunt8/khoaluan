import {
    Dimensions,
    Platform

} from 'react-native'
import { StatusBar } from 'react-native';
// console.log(StatusBar.currentHeight)

export const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const screenWidth = viewportWidth;
export const sliderWidth = viewportWidth;
export const screenheight = viewportHeight;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;


export const APPBAR_HEIGHT = Platform.OS === 'ios' ? screenWidth / 8.2 : StatusBar.currentHeight;