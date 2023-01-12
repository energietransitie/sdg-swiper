# Carbon Case - Frontend

This repository contains the source code for the Carbon Case Estimator app. This tool helps to achieve more awareness
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

This is the app for the Carbon Case Estimator tool. The app is built in React Native, but is currently only built with
web in mind. The app is built with the intention of being able to be built for iOS and Android in the future, but it
needs to be tested extensively beforehand. At the time of writing, the app can be used by anyone with a web browser. No
sign up required. The app consists of two 'tools':

- SDG Swiper: A tool that allows users to swipe through all 17 SDGs to find out on what SDGs they have impact on it,
  either through their IT project or anything else.
- Carbon Case Estimator: A tool that allows users to estimate the carbon footprint of their IT project.

## Deploying

Deploying this application can be done via the following steps:
<br>NOTE: The api urls are 'hardcoded' in the [package.json](package.json) file. If you want to deploy this app, you
will need to change the api urls to your own api urls.

### Deploying without Docker

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `npm run build:production` to build the app
4. You can run the `web-build` folder in a web server of your choice

### Deploying with Docker

1. Clone the repository
2. Run `docker build -t YOUR_TAG_NAME --build-arg ENVIRONMENT=staging|production .` to build the Docker image
3. Run `docker run -p 80:80 YOUR_TAG_NAME` to run the Docker image
4. You can now access the app on `localhost`

This app is also part of a docker compose, so that the whole stack can be deployed at once.
See [carboncase-deployment-configuration](https://github.com/energietransitie/carboncase-deployment-configuration) for
more info.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional)

## Developing

Once you're in the terminal and in the root of the project, you can run the following commands:

- `npm install`: Install all dependencies
- `npm run web`: Start the app in development mode for web
- go to `localhost:19006` in your browser

Also check the [README](src/external-packages/README.md) for the external packages that have been included in this app.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional)
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

Product owner:

* Henri ter Hofte · [@henriterhofte](https://github.com/henriterhofte) · Twitter [@HeNRGi](https://twitter.com/HeNRGi)

We use and gratefully acknowlegde the efforts of the makers of the following source code and libraries:

* [Expo](https://github.com/expo/expo), by 650 Industries, Inc., licensed
  under [MIT](https://github.com/expo/expo/blob/main/LICENSE)
* [Gorhom - Bottom sheet](https://github.com/gorhom/react-native-bottom-sheet), by Mo Gorhom, licensed
  under [MIT](https://github.com/gorhom/react-native-bottom-sheet/blob/master/LICENSE)
* [Gorhom - Paper onboarding](https://github.com/gorhom/react-native-paper-onboarding), by Mo Gorhom, licensed
  under [MIT](https://github.com/gorhom/react-native-paper-onboarding/blob/master/LICENSE)
* [Gorhom - Portal](https://github.com/gorhom/react-native-portal), by Mo Gorhom, licensed
  under [MIT](https://github.com/gorhom/react-native-portal/blob/master/LICENSE)
* [Nivo charts](https://github.com/plouc/nivo), by Raphaël Benitte, licensed
  under [MIT](https://github.com/plouc/nivo/blob/master/LICENSE.md)
* [React navigation](https://github.com/react-navigation/react-navigation), by React Navigation Contributors , licensed
  under [MIT](https://github.com/react-navigation/react-navigation/blob/main/packages/native/LICENSE), [MIT](https://github.com/react-navigation/react-navigation/blob/main/packages/native-stack/LICENSE)
* [Axios](https://github.com/axios/axios), by Matt Zabriskie & Collaborators, licensed
  under [MIT](https://github.com/axios/axios/blob/v1.x/LICENSE)
* [Chart.js](https://github.com/chartjs/Chart.js), by Chart.js Contributors, licensed
  under [MIT](https://github.com/chartjs/Chart.js/blob/master/LICENSE.md)
* [Firebase js sdk](https://github.com/firebase/firebase-js-sdk), by [name of copyright owner], licensed
  under [Apache 2.0 license](https://github.com/firebase/firebase-js-sdk/blob/master/LICENSE)
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
* [React native dropdown picker](https://github.com/hossein-zare/react-native-dropdown-picker), by Hossein Zare,
  licensed under [MIT](https://github.com/hossein-zare/react-native-dropdown-picker/blob/master/LICENSE)
* [React native gesture handler](https://github.com/software-mansion/react-native-gesture-handler), by Software Mansion,
  licensed under [MIT](https://github.com/software-mansion/react-native-gesture-handler/blob/main/LICENSE)
* [React native paper](https://github.com/callstack/react-native-paper), [React native reanimated](https://github.com/software-mansion/react-native-reanimated),
  by Callstack, licensed
  under [MIT](https://github.com/callstack/react-native-paper/blob/main/LICENSE.md), [MIT](https://github.com/software-mansion/react-native-reanimated/blob/main/LICENSE)
* [React native safe area context](https://github.com/th3rdwave/react-native-safe-area-context), by Th3rd Wave, licensed
  under [MIT](https://github.com/th3rdwave/react-native-safe-area-context/blob/main/LICENSE)
* [React simple typewriter](https://github.com/awran5/react-simple-typewriter), by Awran5, licensed
  under [MIT](https://github.com/awran5/react-simple-typewriter/blob/main/LICENSE)
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
