import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopTabs from './TopTabs';


const Stack = createNativeStackNavigator();

const RootNavigation = props => {
    const navigationRef = React.useRef();
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="TopTabs">
                <Stack.Screen
                    name="TopTabs"
                    component={TopTabs}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigation
