import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import AppList from './AppList';
import AppForm from './AppForm';
import AppFormEdit from './AppFormEdit';
 
const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createStackNavigator();

function Stacks(){
    return (
        <Stack.Navigator 
        initialRouteName={"tab"}
        screenOptions={{
            headerShown: false
          }}
        >
        <Stack.Screen name="AppFormEdit" component={AppFormEdit}/>
        <Stack.Screen name="tab" component={TabNavigador}/>
       
        </Stack.Navigator>
    );
}

function TabNavigador(){
    return <Navigator
    initialRouteName="AppList"
    tabBarOptions={{
        style: {
            elevation: 0,
            shadowOpacity: 0,
            height: 64,
        },
        tabStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        labelStyle: {
            fontSize: 13,
            marginLeft: 16
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d'
    }}
>


<Screen name="AppList" component={AppList}
        options={{
        tabBarLabel: "Notícias",
        
        }}
    />
  
  <Screen name="AppForm" component={AppForm}
        options={{
        tabBarLabel: "Adicionar",
        
        }}
    />
  
</Navigator>
}

function AppTab(){
    return(
        <NavigationContainer>
           <Stacks/>
        </NavigationContainer>

    );
}

export default AppTab;