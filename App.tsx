import Yawl from "@edulib-france/expo-yawl";
import {
  DocumentTitleOptions,
  LinkingOptions,
  NavigationContainer,
  NavigationContainerProps,
  NavigationContainerRef,
  Theme,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { createRef, useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";
import { useYawlReactNavigation } from "@edulib-france/expo-yawl-react-navigation-plugin";

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
      <Button title="Track" onPress={() => yawl.track({ name: "test" })} />
    </View>
  );
}

const Stack = createStackNavigator();

const yawl = new Yawl({
  apiKey: "cda712a73aff22114b6f62871697ea15",
  env: "staging",
});
function App() {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<string | undefined>(undefined);
  const [yawlReady, setYawlReady] = useState(false);
  // @ts-ignore
  const { onReady, onStateChange } = useYawlReactNavigation(yawl);
  useEffect(() => {
    yawl.init().then(() => {
      setYawlReady(true);
    });
  }, []);
  console.log("🚀 ===> ~ App.tsx:54 ~ App ~ yawlReady:", yawlReady);
  if (!yawlReady) {
    console.log("🚀 ===> ~ App.tsx:55 ~ App ~ yawlReady:", yawlReady);
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // @ts-ignore
        onReady(navigationRef);
      }}
      onStateChange={async () => {
        // @ts-ignore
        onStateChange(navigationRef);
        // const rt = navigationRef.current?.getCurrentRoute();
        // console.log("🚀 ===> ~ onStateChange:", rt);
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

const YawlNavigationContainer = ({
  ref,
  children,
  onReady,
  onStateChange,
  ...rest
}: NavigationContainerProps & {
  theme?: Theme | undefined;
  linking?: LinkingOptions | undefined;
  fallback?: React.ReactNode;
  documentTitle?: DocumentTitleOptions | undefined;
  onReady?: (() => void) | undefined;
} & React.RefAttributes<NavigationContainerRef>) => {
  const navigationRef = useRef<NavigationContainerRef>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        onReady?.();
        const routeName = navigationRef.current?.getCurrentRoute()?.name;
        console.log("🚀 ===> ~ App.tsx:91 ~ routeName:", routeName);
      }}
      onStateChange={async (s) => {
        onStateChange?.(s);
        const rt = navigationRef.current?.getCurrentRoute();
        console.log("🚀 ===> ~ onStateChange:", rt);
      }}
      {...rest}
    >
      {children}
    </NavigationContainer>
  );
};
