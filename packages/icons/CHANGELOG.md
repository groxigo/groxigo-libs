# @groxigo/icons

## 1.0.5

### Patch Changes

- Align foundation package conventions: engine >=18, typescript ~5.9.2 (tilde), access: public in publishConfig, tsconfig.build.json for i18n

## 1.0.3

### Patch Changes

- Add HeartFilled custom icon for product tile favorites

## 1.0.1

### Patch Changes

- Optimize package sizes: remove src from published files, disable declaration maps, exclude generators from tokens, fix exports to point to dist

## 1.0.0 (2026-01-15)

### Features

- Initial release with 1,216 line icons and 191 solid icons
- Tree-shakable exports via `@groxigo/icons/line` and `@groxigo/icons/solid`
- `createIcon` factory for consistent SVG icon components
- TypeScript support with `IconComponentProps` and `IconComponent` types
- Cross-platform support (React Native via react-native-svg, Web via SVG)
- Accessibility support via `accessibilityLabel` and `testID` props
