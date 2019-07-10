import { Component, h, State } from "@stencil/core";
import { Color } from "../../model/color";
import { sleep } from "../../helpers/helpers";

async function bubbleSort(
  segments: Color[],
  update: (segments: Color[]) => void
) {
  for (let i = 0; i < segments.length; i++) {
    for (let j = 0; j < segments.length - i - 1; j++) {
      if (segments[j].index > segments[j + 1].index) {
        let tmp = segments[j];
        segments[j] = segments[j + 1];
        segments[j + 1] = tmp;
        await sleep(1);
        update(segments);
      }
    }
  }
}

async function insertionSort(
  segments: Color[],
  update: (segments: Color[]) => void
) {
  for (let i = 0; i < segments.length; i++) {
    let el = segments[i];
    let j;

    for (j = i - 1; j >= 0 && segments[j].index > el.index; j--) {
      segments[j + 1] = segments[j];
      await sleep(1);
      update(segments);
    }
    segments[j + 1] = el;
  }
}

async function selectionSort(
  segments: Color[],
  update: (segments: Color[]) => void
) {
  for (let i = 0; i < segments.length; i++) {
    let min = i;
    for (let j = i + 1; j < segments.length; j++) {
      if (segments[j].index < segments[min].index) {
        min = j;
      }
    }
    let temp = segments[i];
    segments[i] = segments[min];
    segments[min] = temp;
    await sleep(15);
    update(segments);
  }
}

async function mergeSort(
  segments: Color[],
  update: (segments: Color[]) => void
) {
  await recursiveMergeSort(segments, 0, segments.length - 1, update);
}

async function recursiveMergeSort(
  arr: Color[],
  l: number,
  r: number,
  update: (segments: Color[]) => void
) {
  if (l < r) {
    const m = Math.floor(l + (r - l) / 2);
    await recursiveMergeSort(arr, l, m, update);
    await recursiveMergeSort(arr, m + 1, r, update);
    await merge(arr, l, m, r, update);
  }
}

async function merge(
  arr: Color[],
  start: number,
  mid: number,
  end: number,
  update: (segments: Color[]) => void
) {
  let start2 = mid + 1;
  if (arr[mid].index <= arr[start2].index) {
    return;
  }

  while (start <= mid && start2 <= end) {
    if (arr[start].index <= arr[start2].index) {
      start++;
    } else {
      const value = arr[start2];
      let index = start2;

      while (index != start) {
        arr[index] = arr[index - 1];
        index--;
      }
      arr[start] = value;
      await sleep(30);
      update(arr);
      start++;
      mid++;
      start2++;
    }
  }
}

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
  shadow: true
})
export class AppRoot {
  sortingAlgos = [bubbleSort, insertionSort, selectionSort, mergeSort];
  titles = ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"];

  sorter: HTMLAppSortElement;

  @State()
  sortingAlgo: typeof bubbleSort;

  @State()
  title: string = "";

  async componentDidLoad() {
    for (let i = 0; i < this.sortingAlgos.length; i++) {
      this.sortingAlgo = this.sortingAlgos[i];
      this.title = this.titles[i];
      await this.sorter.showSort();
    }
  }

  render() {
    return (
      <div>
        <h1 class="title">{this.title}</h1>
        <app-sort ref={el => (this.sorter = el)} sort={this.sortingAlgo} />
      </div>
    );
  }
}
