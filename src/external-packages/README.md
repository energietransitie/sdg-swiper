# External packages

These packages are not part of the main project, but are used by it but had some kind of incompatibility with the main
project, so they were moved to this folder.

## Packages

- [react-native-deck-swiper](react-native-deck-swiper/README.md), by Alexandre Brillant and Bogdan Pop / Webraptor
  license: [ISC](https://github.com/webraptor/react-native-deck-swiper/blob/master/LICENSE)

## Reason for existence

This may not be the best way to do this, but due to complications in the publishing process for the above package with
new versions, we decided to do this for now. Another alternative is using `--legacy-peer-deps` flag
during `npm install`, but this broke the build pipeline while running `npm ci --legacy-peer-deps`.
**A better alternative for the future is to fork the packages, update the `package.json` file and then republish it
under another name, with appropriate credits given.**

This also means that the packages in this folder are not updated automatically, so it is important to check for updates,
once the packages have been updated to a version, for which we do not need the package listed here anymore. If that's
the case, also be sure to remove unused dependencies in the `package.json` file.
