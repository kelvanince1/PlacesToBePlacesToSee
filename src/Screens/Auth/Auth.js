import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../Components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../Components/UI/HeadingText/HeadingText';
import MainText from '../../Components/UI/MainText/MainText';
import ButtonWithBackground from '../../Components/UI/Button/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../Assets/hoka.jpg'
;

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundStyle}>
      <View style={styles.container}>
        <MainText>
          <HeadingText>Please log in</HeadingText>
        </MainText>
        <ButtonWithBackground onPress={() => alert('hello')} color='#29aaf4'>Switch to login</ButtonWithBackground>
        <View style={styles.inputContainer}>
          <DefaultInput placeholder='Your Email address' style={styles.input} />
          <DefaultInput placeholder='Password' style={styles.input} />
          <DefaultInput placeholder='Confirm Password' style={styles.input} />
        </View>
        <ButtonWithBackground onPress={this.loginHandler} color='#29aaf4'>Submit</ButtonWithBackground>
      </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundStyle: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  }
});

export default AuthScreen;
