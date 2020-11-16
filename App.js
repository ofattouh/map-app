import React, { Component } from 'react';
import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { StyleSheet, View } from 'react-native';

export default class App extends Component {
  state = {
    location: null
  }

  async getLocation() {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  async componentDidMount() {
    // Permissions: LOCATION, NOTIFICATIONS, CAMERA, AUDIO_RECORDING, CONTACTS, CAMERA_ROLL, and CALENDAR
    const permission = await Permissions.askAsync(Permissions.LOCATION);

    if (permission.status === 'granted') {
      this.getLocation();
    }
  }

  renderMap() {
    return this.state.location ?
    <MapView
      style={styles.map}
      initialRegion={{
        // location when map first render
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        latitudeDelta: 0.01, // zoom level
        longitudeDelta: 0.01,
      }}
    >
      <MapView.Marker
        coordinate={this.state.location.coords}
        title={"My Location"}
        description={"(" + this.state.location.coords.latitude + ", " + this.state.location.coords.longitude + ")"}
        image={require('./assets/you-are-here.png')}
      />
    </MapView> : null
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMap()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1
  }
});

// expo init my-app
// expo install expo-permissions
// expo install expo-location
// expo install react-native-maps
// https://thenounproject.com/term/you-are-here/12314/
// https://mapstyle.withgoogle.com/
// https://github.com/react-native-maps/react-native-maps
// https://docs.expo.io/versions/latest/sdk/map-view/#deploying-to-a-standalone-app-on-android
