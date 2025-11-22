import { StyleSheet, Text, View } from "react-native";

import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function HomeScreen() {
  const { notification, expoPushToken } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  return (
    <View>
      <Text>{data}</Text>
      <Text>expoPushToken: {expoPushToken?.data ?? ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
