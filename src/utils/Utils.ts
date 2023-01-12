/**
 * Adjust hex color by adding or subtracting a value from each of its RGB components.
 * @param color
 * @param amount
 * @link https://stackoverflow.com/a/57401891/8754953
 */
export const adjustHexColor = (color: string, amount: number): string => {
  return `#${
    color
      .replace(/^#/, '')
      .replace(/../g, c => (`0${Math.min(255, Math.max(0, parseInt(c, 16) + amount))
        .toString(16)}`)
        .substring(-2))
  }`;
};

/**
 * Convert hex to RGB(A)
 * @param hex Hex color code
 * @param alpha
 * @link https://stackoverflow.com/a/51564734/8754953
 */
export const hexToRGB = (hex: string, alpha: number): string => {
  const r: number = parseInt(hex.slice(1, 3), 16);
  const g: number = parseInt(hex.slice(3, 5), 16);
  const b: number = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
};
