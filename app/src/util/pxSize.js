import {Dimensions} from 'react-native';

const deviceWidthDp = Dimensions.get('window').width;

const uiWidthPx = 375;

export function pxSize(uiElementPx) {
  return (uiElementPx * deviceWidthDp) / uiWidthPx;
}
