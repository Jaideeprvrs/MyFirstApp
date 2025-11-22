import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // 1. Ask permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied: Allow location to get weather");
        return;
      }

      // 2. Get user location
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      console.log("User Location:", latitude, longitude);

      // 3. Build Open-Meteo API URL dynamically
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

      // 4. Fetch weather
      const response = await fetch(url);
      const data = await response.json();

      setWeather(data.current_weather);
      setLoading(false);
    })();
  }, []);

  if (!weather) return <ActivityIndicator size="large" />;
  return (
    <View style={{ marginTop: 100, alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>🌤 Weather</Text>
      <Text style={{ fontSize: 18 }}>Temp: {weather?.temperature}°C</Text>
      <Text style={{ fontSize: 18 }}>Wind: {weather?.windspeed} km/h</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
