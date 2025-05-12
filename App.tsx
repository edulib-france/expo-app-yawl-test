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
