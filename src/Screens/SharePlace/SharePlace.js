import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../Store/Actions/index';
import PlaceInput from '../../Components/PlaceInput/PlaceInput';
import MainText from '../../Components/UI/MainText/MainText';
import HeadingText from '../../Components/UI/HeadingText/HeadingText';
import PickImage from '../../Components/PickImage/PickImage';
import PickLocation from '../../Components/PickLocation/PickLocation';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }

  state = {
    placeName: ''
  };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }

    placeNameChangedHandler = (value) => {
      this.setState({
        placeName: value
      })
    }

    placeAddedHandler = () => {
      if(this.state.placeName.trim() !== '') {
        this.props.onAddPlace(this.state.placeName);
      }
    }

    render () {
        return (
            <ScrollView>
                <View style={styles.container}>
                  <MainText><HeadingText>Share a place</HeadingText></MainText>
                  <PickImage />
                  <PickLocation />
                  <PlaceInput
                    placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler}
                  />
                  <View>
                    <Button title="Share the place" onPress={this.placeAddedHandler} />
                  </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  button: {
    margin: 8
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  }
});

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
