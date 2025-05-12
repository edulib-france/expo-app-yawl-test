import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { useRef } from "react";
import { Button, Text, View } from "react-native";

function HomeScreen({ navigation }: StackScreenProps<any>) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
function DetailScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<string | undefined>(undefined);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
        console.log(
          "🚀 ===> ~ App.tsx:40 ~ App ~ routeNameRef.current:",
          navigationRef.current?.getCurrentRoute()
        );
      }}
      onStateChange={async () => {
        const rt = navigationRef.current?.getCurrentRoute();
        console.log("🚀 ===> ~ onStateChange:", rt);
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const YawlNavigationContainer = () => {
  return (
    <NavigationContainer>
      <h1></h1>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};
