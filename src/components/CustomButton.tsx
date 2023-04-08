import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface IProps {
  title: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  customButtonStyles?: ViewStyle;
  customTitleStyles?: TextStyle;
}

const CustomButton = ({
  title,
  onPress,
  customButtonStyles,
  customTitleStyles,
}: IProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, customButtonStyles]}>
      <Text style={[styles.text, customTitleStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#5f41b3',
    alignItems: 'center',
    marginHorizontal: 50,
    borderRadius: 6,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});
