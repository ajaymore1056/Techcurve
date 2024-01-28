import React from 'react';
import { SvgXml } from 'react-native-svg';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const EyeSVG = ({ width = widthPercentageToDP(60), height = heightPercentageToDP(60) }) => {
    const svg = `<svg width="800" height="800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m3 3 18 18M10.5 10.677a2 2 0 0 0 2.823 2.823" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 0 1-1.078 1.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    return <SvgXml width={width} height={height} xml={svg} />;
};

export default EyeSVG;