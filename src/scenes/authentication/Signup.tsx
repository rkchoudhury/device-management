import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';

const Signup = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={styles.headerText}>Signup</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter name"
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter email"
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter EID"
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter password"
            placeholderTextColor={'gray'}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Verify password"
            placeholderTextColor={'gray'}
            secureTextEntry={true}
          />
          <CustomButton title="Signup" onPress={() => console.log('login')} />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  textInput: {
    width: 300,
    marginVertical: 10,
    backgroundColor: '#c3d8e3',
    borderRadius: 6,
    paddingStart: 10,
    fontSize: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5f41b3',
    marginVertical: 50,
    alignSelf: 'center',
  },
});
