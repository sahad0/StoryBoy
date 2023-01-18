import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';
import HomeScreen from '../Components/FirstView/HomeScreen';
import OTPBox from '../Components/FirstView/OTPBox';
import Action from '../Components/SecondView/Action';

const Stack = createNativeStackNavigator(); 

export default function Router() {
  return (
    <NavigationContainer >
         <Stack.Navigator screenOptions={{headerShown:false,animation:'slide_from_right',animationDuration:1}} initialRouteName={'Home'} >
            <Stack.Screen name="Home" component={HomeScreen}  />
            <Stack.Screen name="OTP" component={OTPBox} />
            <Stack.Screen name="Action" component={Action} />

        </Stack.Navigator>
    </NavigationContainer>
  );
}