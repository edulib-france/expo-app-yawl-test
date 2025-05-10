# Test App

- Le projet a été crée avec `npx create-expo-app --template default@sdk-51`
- expo-yawl a été installé avec `npx expo install @edulib-france/expo-yawl`
- les dépendances se trouve bien dans `node_modules`
- :warning: la seule dépendance native qui n'a pas été liée est `@react-native-async-storage/async-storage` qui n'est effectivement pas un expo module.
- `expo run:[android|ios]` et `expo start` marchent correctement.
- :warning: n'oubliez pas de renseigner votre clé-API lors de l'intanciation de `Yawl`
