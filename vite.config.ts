import { defineConfig } from "vite";
import React from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({
      shortcuts: [
        {
          "pos-r": "relative",
          "pos-a": "absolute",
          "pos-f": "fixed",
          "pos-s": "static",
          "pos-i": "inherit",
          "pos-u": "unset",
          "pos-in": "initial",
          "pos-st": "sticky",
          ofh: "overflow-hidden",
          ofv: "overflow-visible",
          ofa: "overflow-auto",
          ofxh: "overflow-x-hidden",
          ofyh: "overflow-y-hidden",
          jcsb: "flex-justify-between",
          jcsa: "flex-justify-around",
          jcsfe: "flex-justify-end",
          jcfs: "flex-justify-start",
          jcc: "flex-justify-center",
        },
      ],
      rules: [
        ["wf", { width: "100%" }],
        ["hf", { height: "100%" }],
        ["ff-primary", { "font-family": "Megrim, monospace" }],

        [/^fs-(\d+)$/, ([, d]) => ({ "font-size": `${parseInt(d) / 4}rem` })],
        [
          /^br-tl-(\d+)$/,
          ([, d]) => ({ "border-top-left-radius": `${parseInt(d) / 4}rem` }),
        ],
        [
          /^br-tr-(\d+)$/,
          ([, d]) => ({ "border-top-right-radius": `${parseInt(d) / 4}rem` }),
        ],
        [
          /^br-bl-(\d+)$/,
          ([, d]) => ({ "border-bottom-left-radius": `${parseInt(d) / 4}rem` }),
        ],
        [
          /^br-br-(\d+)$/,
          ([, d]) => ({
            "border-bottom-right-radius": `${parseInt(d) / 4}rem`,
          }),
        ],
      ],

      presets: [
        presetUno(),
        presetAttributify(),
        presetWebFonts({
          provider: "google",
          fonts: [{ name: "Megrim" }],
        }),
        presetIcons({
          extraProperties: {
            display: "inline-block",
            "vertical-align": "middle",
          },
        }),
      ],
      preflights: [
        {
          getCSS: () => `
        /*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body, main {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}
      `,
        },
      ],
    }),
    React(),
  ],
});
