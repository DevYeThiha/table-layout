declare global {
    declare namespace JSX {
      interface IntrinsicElements {
        "amp-analytics": any;
      }
    }
    interface Window {
      fbAsyncInit;
      FB: FB | null;
      category_alias: string | null | undefined;
      set_category_alias_action: NodeJS.Timeout | undefined;
      set_product_scrolling: NodeJS.Timeout | undefined;
      after_hovering_on_main: NodeJS.Timeout | undefined;
      after_hovering_on_micro: NodeJS.Timeout | undefined;
      current_scroll: string | undefined;
      google: any;
      google_callback: any;
      product_scrolling: "main" | "micro" | undefined
      manageBoards: ((value: number) => void) | undefined;
      currentBoard: number | undefined;
      testerMode: boolean | undefined;
      toggleTestMode: () => void;
      toggleProductLogger: () => void;
      gtag: any;
    }
  }