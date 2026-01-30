// Mock React Native for Jest testing
// This avoids parsing issues with React Native's Flow/TypeScript syntax
const React = require('react');

// Create proper component functions
const createMockComponent = (name) => {
  const Component = (props) => React.createElement('div', { ...props, 'data-testid': props.testID });
  Component.displayName = name;
  return Component;
};

module.exports = {
  View: createMockComponent('View'),
  Text: createMockComponent('Text'),
  TextInput: createMockComponent('TextInput'),
  Pressable: createMockComponent('Pressable'),
  TouchableOpacity: createMockComponent('TouchableOpacity'),
  FlatList: createMockComponent('FlatList'),
  ActivityIndicator: createMockComponent('ActivityIndicator'),
  Animated: {
    View: createMockComponent('Animated.View'),
    Text: createMockComponent('Animated.Text'),
    Value: jest.fn(() => ({
      setValue: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
    timing: jest.fn(() => ({
      start: jest.fn((callback) => callback && callback()),
    })),
    sequence: jest.fn((animations) => ({
      start: jest.fn((callback) => {
        animations.forEach((anim) => anim.start && anim.start());
        callback && callback();
      }),
    })),
  },
  Platform: {
    OS: 'ios',
    select: jest.fn((options) => options.ios || options.default),
  },
  StyleSheet: {
    create: (styles) => styles,
    flatten: (style) => style,
  },
};

