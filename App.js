import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import Navigation from './src/Navigation';
import ReservasiScreen from './src/ReservasiScreen';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Navigation" component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
