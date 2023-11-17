import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const CurrentLocationMap = () => {
  const [region, setRegion] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.006, // Giảm giá trị này để zoom vào
        longitudeDelta: 0.006, // Giảm giá trị này để zoom vào
      };
      setRegion(newRegion);

      // Nếu mapRef.current tồn tại và bản đồ đã sẵn sàng, thực hiện zoom
      mapRef.current?.animateToRegion(newRegion, 1000); // 1000 là thời gian thực hiện animation
    })();
  }, []);

  if (!region) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
      >
        <Marker coordinate={region} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 3, // Adjust the size as needed
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CurrentLocationMap;
