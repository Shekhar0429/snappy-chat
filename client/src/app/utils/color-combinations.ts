import { colors } from './constants';

export default class ColorCombinations {
  static getColorCombinations = (color: number): string => {
    if (color >= 0 && colors.length) return colors[color];
    return colors[0];
  };
}
