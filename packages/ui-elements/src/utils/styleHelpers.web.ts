import type { CSSProperties } from 'react';

/**
 * List of React Native props that should not be passed to web DOM elements
 */
const REACT_NATIVE_ONLY_PROPS = [
  // Shadow props (use boxShadow instead)
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'elevation',
  // Other React Native-specific props
  'overlayColor',
  'tintColor',
  // TextInput props
  'keyboardType',
  'numberOfLines',
  'returnKeyType',
  'textContentType',
  'multiline',
  'secureTextEntry',
  'editable',
  'placeholderTextColor',
  'onChangeText',
  'autoCapitalize',
  'autoCorrect',
  'autoComplete',
  'autoFocus',
  'blurOnSubmit',
  'clearButtonMode',
  'contextMenuHidden',
  'dataDetectorTypes',
  'enablesReturnKeyAutomatically',
  'inlineImageLeft',
  'inlineImagePadding',
  'inputAccessoryViewID',
  'keyboardAppearance',
  'maxFontSizeMultiplier',
  'onContentSizeChange',
  'onEndEditing',
  'onKeyPress',
  'onScroll',
  'onSelectionChange',
  'onSubmitEditing',
  'rejectResponderTermination',
  'scrollEnabled',
  'selection',
  'selectionColor',
  'selectionState',
  'showSoftInputOnFocus',
  'spellCheck',
  'textBreakStrategy',
  'underlineColorAndroid',
];

/**
 * Convert React Native style to CSS properties for web
 * Filters out React Native-specific props that aren't valid for web DOM elements
 */
export const flattenStyle = (style: any): CSSProperties => {
  if (!style) return {};
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }
  if (typeof style === 'object') {
    const cssStyle: Record<string, any> = {};

    for (const key in style) {
      if (style.hasOwnProperty(key) && !REACT_NATIVE_ONLY_PROPS.includes(key)) {
        cssStyle[key] = style[key];
      }
    }
    return cssStyle as CSSProperties;
  }
  return {};
};

/**
 * Filter out React Native-specific props from props object
 * Use this when spreading props to DOM elements
 */
export const filterReactNativeProps = <T extends Record<string, any>>(props: T): Partial<T> => {
  const filtered: Partial<T> = {};
  for (const key in props) {
    if (props.hasOwnProperty(key) && !REACT_NATIVE_ONLY_PROPS.includes(key)) {
      filtered[key] = props[key];
    }
  }
  return filtered;
};

