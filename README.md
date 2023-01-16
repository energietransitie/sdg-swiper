# Carbon Case - Frontend

This repository contains the source code for the SDG swiper in a standalone version. This tool helps to achieve more awareness
and competence in regard to sustainable energy transition.

## Table of contents

* [General info](#general-info)
* [Deploying](#deploying)
* [Developing](#developing)
* [Features](#features)
* [Status](#status)
* [License](#license)
* [Credits](#credits)

## General info

This is the standlone version for the SDG swiper: a tool that allows users to swipe through all 17 SDGs to find out on what SDGs they have impact on it,
  either through their IT project or anything else.

## Updating SDGs
Don't know how to code, but want to update SDG information? No problem!

Updating SDG information:  
- Go to the [SDG data file](src/constants/SdgData.ts) and edit the desired SDG.
- Updated title or description? Ensure to update the translation files also: [English](web/locales/en/translation.json) and [Dutch](web/locales/nl/translation.json). 

## Deploying

Deploying this application can be done via the following steps:
1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `npm run deploy` to deploy the app to github pages
4. You can run the `web-build` folder in a web server of your choice

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)

## Developing

Once you're in the terminal and in the root of the project, you can run the following commands:

- `npm install`: Install all dependencies
- `npm run web`: Start the app in development mode for web
- go to `localhost:19006` in your browser

Also check the [README](src/external-packages/README.md) for the external packages that have been included in this app.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [Expo](https://expo.io/) (optional)
- Code editor/IDE of your choice

## Features

Features and TODO's are listed in other files, they can be acquired by
contacting [@henriterhofte](https://github.com/henriterhofte).

## Status

Project is: _in progress_, and will be completed in the near future for some additional features.

## License

This software is available under the [Apache 2.0 license](./LICENSE), Copyright
2023 [Research group Energy Transition, Windesheim University of Applied Sciences](https://windesheim.nl/energietransitie)

## Credits

Product owners:

* Claudia Tempels · [@p82801888](https://github.com/p82801888)
* Henri ter Hofte · [@henriterhofte](https://github.com/henriterhofte) · Twitter [@HeNRGi](https://twitter.com/HeNRGi)

We use and gratefully acknowlegde the efforts of the makers of the following source code and libraries:

* [Expo](https://github.com/expo/expo), by 650 Industries, Inc., licensed
  under [MIT](https://github.com/expo/expo/blob/main/LICENSE)
* [React navigation](https://github.com/react-navigation/react-navigation), by React Navigation Contributors , licensed
  under [MIT](https://github.com/react-navigation/react-navigation/blob/main/packages/native/LICENSE), [MIT](https://github.com/react-navigation/react-navigation/blob/main/packages/native-stack/LICENSE)
* [Chart.js](https://github.com/chartjs/Chart.js), by Chart.js Contributors, licensed
  under [MIT](https://github.com/chartjs/Chart.js/blob/master/LICENSE.md)
* [i18next](https://github.com/i18next/i18next), by i18next, licensed
  under [MIT](https://github.com/i18next/i18next/blob/master/LICENSE)
* [InversifyJS](https://github.com/inversify/InversifyJS), by Remo H. Jansen, licensed
  under [MIT](https://github.com/inversify/InversifyJS/blob/master/LICENSE)
* [Inversify-react](https://github.com/Kukkimonsuta/inversify-react), by {name of copyright owner}, licensed
  under [Apache 2.0 license](https://github.com/Kukkimonsuta/inversify-react/blob/master/LICENSE)
* [jsPDF](https://github.com/parallax/jsPDF), by James Hall, yWorks GmbH, licensed
  under [MIT](https://github.com/parallax/jsPDF/blob/master/LICENSE)
* [jsPDF autotable](https://github.com/simonbengtsson/jsPDF-AutoTable), by Simon Bengtsson, licensed
  under [MIT](https://github.com/simonbengtsson/jsPDF-AutoTable/blob/master/LICENSE.txt)
* [Nativewind](https://github.com/marklawlor/nativewind), by Mark Lawlor, licensed
  under [MIT](https://github.com/marklawlor/nativewind/blob/main/packages/nativewind/LICENSE)
* [React](https://github.com/facebook/react), by Meta Platforms, Inc. and affiliates, licensed
  under [MIT](https://github.com/facebook/react/blob/main/LICENSE)
* [React ChartJS 2](https://github.com/reactchartjs/react-chartjs-2), by Jeremy Ayerst, licensed
  under [MIT](https://github.com/reactchartjs/react-chartjs-2/blob/master/LICENSE)
* [React error boundary](https://github.com/bvaughn/react-error-boundary) by Brian Vaughn, licensed
  under [MIT](https://github.com/bvaughn/react-error-boundary/blob/master/LICENSE)
* [React native](https://github.com/facebook/react-native), by Meta Platforms, Inc. and its affiliates, licensed
  under [MIT](https://github.com/facebook/react-native/blob/main/LICENSE)
* [React native gesture handler](https://github.com/software-mansion/react-native-gesture-handler), by Software Mansion,
  licensed under [MIT](https://github.com/software-mansion/react-native-gesture-handler/blob/main/LICENSE)
* [React native safe area context](https://github.com/th3rdwave/react-native-safe-area-context), by Th3rd Wave, licensed
  under [MIT](https://github.com/th3rdwave/react-native-safe-area-context/blob/main/LICENSE)
* [Reflect metadata](https://github.com/rbuckton/reflect-metadata), by rbuckton, licensed
  under [Apache 2.0 license](https://github.com/rbuckton/reflect-metadata/blob/master/LICENSE)
* [React native for web](https://github.com/necolas/react-native-web), by Nicolas Gallagher, licensed
  under [MIT](https://github.com/necolas/react-native-web/blob/master/LICENSE)
* [rxjs](https://github.com/ReactiveX/rxjs), by Google, Inc., Netflix, Inc., Microsoft Corp. and contributors, licensed
  under [Apache 2.0 license](https://github.com/ReactiveX/rxjs/blob/master/LICENSE.txt)
* [styled components](https://github.com/styled-components/styled-components), by Glen Maddern and Maximilian Stoiber,
  licensed under [MIT](https://github.com/styled-components/styled-components/blob/main/LICENSE)
* [babel](https://github.com/babel/babel), by Sebastian McKenzie and other contributors, licensed
  under [MIT](https://github.com/babel/babel/blob/main/LICENSE)
* [definitely typed](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE), by contributors, licensed
  under [MIT](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE)
* [typescript eslint](https://github.com/typescript-eslint/typescript-eslint), by JS Foundation and other contributors,
  licensed
  under [MIT](https://github.com/typescript-eslint/typescript-eslint/blob/main/LICENSE)
* [Autoprefixer](https://github.com/postcss/autoprefixer), by Andrey Sitnik, licensed
  under [MIT](https://github.com/postcss/autoprefixer/blob/main/LICENSE)
* [Cross-env](https://github.com/kentcdodds/cross-env), by Kent C. Dodds, licensed
  under [MIT](https://github.com/kentcdodds/cross-env/blob/master/LICENSE)
* [Eslint](https://github.com/eslint/eslint), by OpenJS Foundation and other contributors, licensed
  under [MIT](https://github.com/eslint/eslint/blob/main/LICENSE)
* [Eslint airbnb config](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base), by
  Airbnb, licensed
  under [MIT](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/LICENSE.md)
* [Eslint plugin jest](https://github.com/jest-community/eslint-plugin-jest), by Jonathan Kim, licensed
  under [MIT](https://github.com/jest-community/eslint-plugin-jest/blob/main/LICENSE)
* [Eslint plugin JSX a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y), by Ethan Cohen, licensed
  under [MIT](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/LICENSE.md)
* [Eslint plugin react](https://github.com/jsx-eslint/eslint-plugin-react), by Yannick Croissant, licensed
  under [MIT](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/LICENSE)
* [Jest](https://github.com/facebook/jest), by Facebook, Inc. and its affiliates, licensed
  under [MIT](https://github.com/facebook/jest/blob/main/LICENSE)
* [Metro](https://github.com/facebook/metro), by Meta Platforms, Inc. and its affiliates, licensed
  under [MIT](https://github.com/facebook/metro/blob/main/LICENSE)
* [PostCSS](https://github.com/postcss/postcss), by Andrey Sitnik, licensed
  under [MIT](https://github.com/postcss/postcss/blob/main/LICENSE)
* [PostCSS loader](https://github.com/webpack-contrib/postcss-loader), by JS Foundation and other contributors, licensed
  under [MIT](https://github.com/webpack-contrib/postcss-loader/blob/master/LICENSE)
* [TailwindCSS](https://github.com/tailwindlabs/tailwindcss), by Tailwind Labs, Inc., licensed
  under [MIT](https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE)
* [TS Node](https://github.com/TypeStrong/ts-node), by Blake Embrey, licensed
  under [MIT](https://github.com/TypeStrong/ts-node/blob/main/LICENSE)
* [Typescript](https://github.com/microsoft/TypeScript), by Microsoft Corporation, licensed
  under [Apache 2.0 license](https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt)
* [React native deck swiper](https://github.com/webraptor/react-native-deck-swiper), by Alexandre Brillant and Bogdan
  Pop / Webraptor, licensed
  under [ISC](https://github.com/webraptor/react-native-deck-swiper/blob/master/LICENSE)
