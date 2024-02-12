import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import * as Location from 'expo-location';
import MainAppbar from './components/MainAppbar';
import Map from './screens/Map';

const App = () => {
  const [location, setLocation] = useState({
    latitude: 65.046427,
    longitude: 25.430372,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [icon, setIcon] = useState('crosshairs');

  const getUserPosition = async () => {
    setIcon('crosshairs-question');
    let { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status !== 'granted') {
        console.log('Geolocation failed');
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation({ ...location, latitude: coords.latitude, longitude: coords.longitude });
      console.log(location);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PaperProvider>
      <MainAppbar
        title="Map"
        backgroundColor="#0000FF"
        icon={icon}
        getUserPosition={getUserPosition}
      />
      <SafeAreaView style={styles.container}>
        <Map location={location} />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;