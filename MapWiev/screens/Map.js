import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = (props) => {
  const [marker, setMarker] = useState(null);

  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarker(coords);
  };

  useEffect(() => {
    (async () => {
      await getUserPosition();
    })();
  }, []);

  const getUserPosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Geolocation failed');
        return;
      }

      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setMarker({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MapView
        style={styles.map}
        region={props.location}
        mapType='satellite'
        onLongPress={showMarker}
      >
        {marker && (
          <Marker
            title="My marker"
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        )}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});

export default Map;