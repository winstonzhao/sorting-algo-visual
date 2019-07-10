/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  Color,
} from './model/color';

export namespace Components {
  interface AppRoot {}
  interface AppSort {
    'showSort': () => Promise<void>;
    'sort': (
    segments: Color[],
    update: (segments: Color[]) => void
    ) => Promise<void>;
  }
}

declare global {


  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLAppSortElement extends Components.AppSort, HTMLStencilElement {}
  var HTMLAppSortElement: {
    prototype: HTMLAppSortElement;
    new (): HTMLAppSortElement;
  };
  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'app-sort': HTMLAppSortElement;
  }
}

declare namespace LocalJSX {
  interface AppRoot extends JSXBase.HTMLAttributes<HTMLAppRootElement> {}
  interface AppSort extends JSXBase.HTMLAttributes<HTMLAppSortElement> {
    'sort'?: (
    segments: Color[],
    update: (segments: Color[]) => void
    ) => Promise<void>;
  }

  interface IntrinsicElements {
    'app-root': AppRoot;
    'app-sort': AppSort;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


