import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

class PlaceInput extends Component {
  state = {
    placeName: ''
  }

  placeNameChange = (value) => {
    this.setState({
      placeName: value
    })
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    this.props.onPlaceAdded(this.state.placeName);
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.placeInput}
          placeholder='Place to see'
          value={this.state.placeName}
          onChangeText={this.placeNameChange}
        />
        <Button
          style={styles.placeButton}
          title='Add'
          onPress={this.placeSubmitHandler}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  },
})

export default PlaceInput;
