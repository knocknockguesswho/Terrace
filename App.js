import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackground} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import Profile from './src/screens/Profile';
import UserDetail from './src/screens/UserDetail';
import Chatroom from './src/screens/Chatroom';
import SearchUsers from './src/screens/SearchUsers';
import ProfileSettings from './src/screens/ProfileSettings';
import MapDetail from './src/screens/MapDetail';


import Chats from './src/tabs/home_tabs/Chats';
import Contacts from './src/tabs/home_tabs/Contacts';
import Phone from './src/tabs/home_tabs/Phone';

import ChatLogo from './assets/images/comment-dots-blue.svg';
import ChatLogoActive from './assets/images/comment-dots-circle.svg';
import PhoneLogo from './assets/images/phone.svg';
import ContactLogo from './assets/images/user-friends.svg';

import { Provider } from 'react-redux';
import storage from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = storage


const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const TabRoute = () =>{
  return(
    <Tab.Navigator tabBarOptions={{showLabel: false, showIcon: true, style:{borderTopColor: 'transparent', backgroundColor: 'white', height: 75, justifyContent: 'center', shadowColor: 'transparent', shadowOpacity: 0, borderWidth: 0, elevation: 0, shadowOffset:{height:0}, shadowRadius: 0}, indicatorStyle: {backgroundColor: '#188FDE'}, pressColor:'transparent'}} tabBarPosition='bottom' initialRouteName="Chats">
        <Tab.Screen name='Contacts' component={Contacts}
          options={{tabBarIcon: ({focused}) =>(
            focused ?
            <ContactLogo width={25} height={25} /> :
            <ContactLogo width={25} height={25} /> 
          )}}
        />
        <Tab.Screen name='Chats' component={Chats}
          options={{tabBarIcon: ({focused}) =>(
            focused ?
            <ChatLogo width={25} height={25} /> :
            <ChatLogo width={25} height={25} /> 
          )}}
        />
        <Tab.Screen name='Phone' component={Phone} 
          options={{tabBarIcon: ({focused}) =>(
            focused ?
            <PhoneLogo width={25} height={25} /> :
            <PhoneLogo width={25} height={25} /> 
          )}}
        />
    </Tab.Navigator>
  )
}


const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' headerMode="none">
              <Stack.Screen name='Home' component={TabRoute} />
              <Stack.Screen name='Signin' component={Signin} />
              <Stack.Screen name='Signup' component={Signup} />
              <Stack.Screen name='Profile' component={Profile} />
              <Stack.Screen name='UserDetail' component={UserDetail} />
              <Stack.Screen name='SearchUsers' component={SearchUsers} />
              <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
              <Stack.Screen name='Chatroom' component={Chatroom} />
              <Stack.Screen name='MapDetail' component={MapDetail} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
