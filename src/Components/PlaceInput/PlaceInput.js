import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceInput = (props) => (
    <DefaultInput
      placeholder="Place Name"
      value={props.placeName}
      onChangeText={props.onChangeText}
    />
);

export default PlaceInput;
