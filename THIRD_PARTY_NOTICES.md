# Third-party credits and licence notices

Published at [rsudoku.pl/credits.html](https://rsudoku.pl/credits.html). Full notice texts are shipped in `dist/licenses/`. These notices do not license the application’s own code.

## Tesseract.js 5.1.1

OCR in the browser. Apache-2.0. [Upstream](https://github.com/naptha/tesseract.js/tree/v5.1.1).

- [tesseract-js-LICENSE.txt](dist/licenses/tesseract-js-LICENSE.txt)
- [dist_tesseract.min.js.LICENSE.txt](dist/licenses/dist_tesseract.min.js.LICENSE.txt)
- [dist_worker.min.js.LICENSE.txt](dist/licenses/dist_worker.min.js.LICENSE.txt)

## Tesseract.js-core 5.1.1 and Tesseract

WebAssembly OCR engine. Apache-2.0. [Upstream](https://github.com/naptha/tesseract.js-core/tree/v5.1.1).

- [core-LICENSE.txt](dist/licenses/core-LICENSE.txt)
- [native-tesseract-LICENSE.txt](dist/licenses/native-tesseract-LICENSE.txt)

## English OCR training data

English language data provided by the Tesseract projects. Apache-2.0. [Upstream](https://github.com/tesseract-ocr/tessdata).

- [eng-data-LICENSE.txt](dist/licenses/eng-data-LICENSE.txt)

## DM Sans

Google Fonts / DM Sans Project Authors. SIL Open Font License 1.1. [Upstream](https://github.com/googlefonts/dm-fonts).

- [dm-sans-OFL.txt](dist/licenses/dm-sans-OFL.txt)

## Manrope

Manrope Project Authors. SIL Open Font License 1.1. [Upstream](https://github.com/googlefonts/manrope).

- [manrope-OFL.txt](dist/licenses/manrope-OFL.txt)

## Sudoku Exchange puzzle bank

Grant McLean and contributors. Public domain / Unlicense. Dataset revision d8c8ebaee0c08c412cfba96af1923dfa61c83317. [Upstream](https://github.com/grantm/sudoku-exchange-puzzle-bank).

- [sudoku-exchange-LICENSE.txt](dist/licenses/sudoku-exchange-LICENSE.txt)

## OCR JavaScript dependencies

Copyright holders and full terms are retained in the linked notices: regenerator-runtime (MIT), buffer (MIT), ieee754 (BSD-3-Clause), zlib.js (MIT), idb-keyval (ISC), wasm-feature-detect (Apache-2.0). [Upstream](https://github.com/naptha/tesseract.js/blob/v5.1.1/package.json).

- [regenerator-LICENSE.txt](dist/licenses/regenerator-LICENSE.txt)
- [buffer-LICENSE.txt](dist/licenses/buffer-LICENSE.txt)
- [ieee754-LICENSE.txt](dist/licenses/ieee754-LICENSE.txt)
- [zlibjs-LICENSE.txt](dist/licenses/zlibjs-LICENSE.txt)
- [idb-keyval-LICENSE.txt](dist/licenses/idb-keyval-LICENSE.txt)
- [wasm-feature-detect-LICENSE.txt](dist/licenses/wasm-feature-detect-LICENSE.txt)

## Native OCR components

Leptonica, giflib, libjpeg, libpng, libtiff, libwebp, zlib and OpenLibm. Notices below come from the component revisions pinned by Tesseract.js-core 5.1.1; each component retains its own terms. [Upstream](https://github.com/naptha/tesseract.js-core/tree/v5.1.1/third_party).

- [native-giflib-COPYING.txt](dist/licenses/native-giflib-COPYING.txt)
- [native-leptonica-leptonica-license_txt.txt](dist/licenses/native-leptonica-leptonica-license_txt.txt)
- [native-libjpeg-README.txt](dist/licenses/native-libjpeg-README.txt)
- [native-libpng-LICENSE.txt](dist/licenses/native-libpng-LICENSE.txt)
- [native-libtiff-COPYRIGHT.txt](dist/licenses/native-libtiff-COPYRIGHT.txt)
- [native-libwebp-COPYING.txt](dist/licenses/native-libwebp-COPYING.txt)
- [native-libwebp-PATENTS.txt](dist/licenses/native-libwebp-PATENTS.txt)
- [native-openlibm-LICENSE_md.txt](dist/licenses/native-openlibm-LICENSE_md.txt)
- [native-zlib-README.txt](dist/licenses/native-zlib-README.txt)

## Native source revisions

From the gitlinks in Tesseract.js-core v5.1.1. Licence texts have been copied without modification. libjpeg and zlib retain their full upstream README files because those files contain their licence notices.

```json
{
  "giflib": "fa37672085ce4b3d62c51627ab3c8cf2dda8009a",
  "leptonica": "4af068b56a9674da915debea4ed7e1b9885b17e8",
  "libjpeg": "6c0fcb8ddee365e7abc4d332662b06900612e923",
  "libpng": "a37d4836519517bdce6cb9d956092321eca3e73b",
  "libtiff": "b51bb157123264e26d34c09cc673d213aea61fc7",
  "libwebp": "20ef03ee351d4ff03fc5ff3ec4804a879d1b9d5c",
  "openlibm": "ae2d91698508701c83cab83714d42a1146dccf85",
  "tesseract": "e20b1c6553c8f68c4bbff1feef0a64064959a427",
  "zlib": "21767c654d31d2dccdde4330529775c6c5fd5389"
}
```

JavaScript bundle copyright notices are also preserved verbatim. Browser dependencies are credited here; Node-only and build-only dependencies are not distributed by this app. Fonts are served by Google Fonts under OFL 1.1. External OCR components are unmodified.
