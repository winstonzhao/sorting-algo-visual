export class Color {
  r: number;
  g: number;
  b: number;
  hex: string;
  index: number;

  constructor(hex: string) {
    hex = hex.replace("#", "");

    if (!/^[a-z0-9]+$/i.test(hex) || hex.length != 6) {
      throw new Error("Invalid hex");
    }

    this.hex = `#${hex}`;
    this.r = parseInt(hex.slice(0, 2), 16);
    this.g = parseInt(hex.slice(2, 4), 16);
    this.b = parseInt(hex.slice(4, 6), 16);
  }

  static fromRGB(r: number, g: number, b: number) {
    let output = "#";
    for (const x of [r, g, b]) {
      output += ("0" + Math.floor(x).toString(16)).slice(-2);
    }
    return new Color(output);
  }
}
