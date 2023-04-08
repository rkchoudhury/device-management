import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import CustomButton from '../../components/CustomButton';

const Login = ({navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={styles.headerText}>Login</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter email or EID"
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter password"
            placeholderTextColor={'gray'}
            secureTextEntry={true}
          />
          <CustomButton
            title="Login"
            onPress={() => navigation.navigate('Dashboard')}
          />
          <CustomButton
            title="Sign up"
            onPress={() => navigation.navigate('Signup')}
            customButtonStyles={styles.customButtonStyles}
            customTitleStyles={styles.customTitleStyles}
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5f41b3',
    marginVertical: 50,
    alignSelf: 'center',
  },
  textInput: {
    width: 300,
    marginVertical: 10,
  },
  customButtonStyles: {backgroundColor: '#ffffff'},
  customTitleStyles: {color: '#5f41b3'},
});
