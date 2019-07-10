import { Component, h, State, Prop, Method } from "@stencil/core";
import { Color } from "../../model/color";
import { random } from "../../helpers/helpers";

@Component({
  tag: "app-sort",
  styleUrl: "app-sort.css",
  shadow: true
})
export class AppSort {
  @State()
  containerWidth: number;

  @State()
  containerHeight: number;

  containerRef: HTMLDivElement;

  @State()
  numSegments = 100;

  numSwaps = 10000;

  color1: Color = new Color("#000572");

  color2: Color = new Color("#ff3d3d");

  @State()
  segments: Color[];

  @Prop()
  sort: (
    segments: Color[],
    update: (segments: Color[]) => void
  ) => Promise<void>;

  @Method()
  async showSort() {
    this.shuffleColors();
    await this.sort(this.segments, segments => {
      this.segments = [...segments];
    });
  }

  componentWillLoad() {
    this.generateColors();
    this.shuffleColors();
  }

  componentDidLoad() {
    this.containerWidth = this.containerRef.offsetWidth;
    this.containerHeight = this.containerRef.offsetHeight;
  }

  generateColors() {
    const segments: Color[] = [];

    for (let i = 0; i < this.numSegments; i++) {
      let str = "#";
      for (const key of ["r", "g", "b"]) {
        str += (
          "0" +
          Math.floor(
            ((this.color2[key] - this.color1[key]) / this.numSegments) * i +
              this.color1[key]
          ).toString(16)
        ).slice(-2);
      }
      const color = new Color(str);
      color.index = i;
      segments.push(color);
    }

    this.segments = segments;
  }

  shuffleColors() {
    for (let i = 0; i < this.numSwaps; i++) {
      const a = random(0, this.numSegments - 1);
      const b = random(0, this.numSegments - 1);
      const tmp = this.segments[a];
      this.segments[a] = this.segments[b];
      this.segments[b] = tmp;
    }
  }

  renderSegments() {
    return this.segments.map(color => (
      <div
        style={{
          height: `${this.containerHeight}px`,
          width: Math.ceil(this.containerWidth / this.numSegments) + "px",
          backgroundColor: color.hex
        }}
      />
    ));
  }

  render() {
    return (
      <div ref={el => (this.containerRef = el)} class="container">
        {this.renderSegments()}
      </div>
    );
  }
}
