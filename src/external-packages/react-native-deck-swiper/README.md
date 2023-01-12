# React-native-deck-swiper

## Original package

[react-native-deck-swiper](https://github.com/gorhom/react-native-paper-onboarding), by Alexandre Brillant and Bogdan
Pop / Webraptor, [ISC](https://github.com/webraptor/react-native-deck-swiper/blob/master/LICENSE)

## Changes

- Updated package versions.
- Added property `cardWidth` of type number, which is used to calculate the overlay placement.
- Updated `calculateOverlayLabelWrapperStyle()` in [index.js](swiper/index.js) by adding an updated `width` property for
  the `overlayLabelWrapperStyle` object, based on the `cardWidth`. This fixes the position of the label for left and
  right swipes.
