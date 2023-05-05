import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewScreen from '../screens/TabScreens/NewScreen';
import TopScreen from '../screens/TabScreens/TopScreen';
import HotScreen from '../screens/TabScreens/HotScreen';

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
    return (

        <Tab.Navigator>
            <Tab.Screen name="New" component={NewScreen} />
            <Tab.Screen name="Top" component={TopScreen} />
            <Tab.Screen name="Hot" component={HotScreen} />
        </Tab.Navigator>

    )
}

export default TopTabs