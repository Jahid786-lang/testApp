import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import theme from '../utils/theme';

const defaultProps = {
  title: '',
  disabled: false,
  isLoading: false,
  onPressButton: () => {},
};

/**
 * ButtonComponent
 * 
 * This is a customizable button component for React Native applications.
 * It displays a text or an activity indicator based on the isLoading prop.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the button.
 * @param {boolean} props.disabled - Determines if the button is disabled.
 * @param {boolean} props.isLoading - Indicates if the button should display a loading indicator.
 * @param {Function} props.onPressButton - Function to call when the button is pressed.
 * @returns {React.Element} The rendered button component.
 */

const ButtonComponent = props => {
  const {title, disabled, isLoading, onPressButton } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={
        props.disabled
          ? styles.button
          : [styles.button, {backgroundColor: theme.red, opacity: 1}]
      }
      onPress={() => onPressButton()}>
      {!isLoading ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <ActivityIndicator size="small" color={theme.white} />
      )}
    </TouchableOpacity>
  );
};

ButtonComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: theme.red,
    height: 54,
    opacity: 0.4,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: theme.black,
  },
});

export default ButtonComponent;
