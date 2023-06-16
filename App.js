import { View } from 'react-native';
import React, { useContext } from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { UserContext, UserProvider } from './utils/UserContext';
import { color_header_grey35 } from './styles/colors';

import Guest_Home     from './screens/Guest_Home';
import Guest_ListOdds from './screens/Guest_ListOdds';
import Guest_Register from './screens/Guest_Register';
import Guest_Login    from './screens/Guest_Login';

import Regist_Home              from './screens/Regist_Home';
import Regist_Odds_ListLeagues  from './screens/Regist_Odds_ListLeagues';
import Regist_Odds_ListGames    from './screens/Regist_Odds_ListGames';
import Regist_Odds_ListOdds     from './screens/Regist_Odds_ListOdds';
import Regist_Favourites        from './screens/Regist_Favourites';
import Settings                 from './screens/Settings';

import Admin_Tab_Home               from './screens/Admin_Tab_Home';
import Admin_AvailableLeagues       from './screens/Admin_AvailableLeagues';
import Admin_AvailableOdds          from './screens/Admin_AvailableOdds';
import Admin_DailyGame_ListLeagues  from './screens/Admin_DailyGame_ListLeagues';
import Admin_DailyGame_ListGames    from './screens/Admin_DailyGame_ListGames';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <UserProvider>
      <View style={{flex:1}}>
        <NavigationContainer>
          <Body/>
        </NavigationContainer>
      </View>
    </UserProvider>
  );
}



function Body() {
  const { registed, isAdmin } = useContext(UserContext);

  return (
    <>
    {
      (registed) ?
        (isAdmin) ? 
        Tab_Admin() 
        :
        Tab_Regist()
      :
      Stack_Guest()
    }
    </>
  );
}



const StackOptions_Common = (title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: color_header_grey35,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textShadowRadius: 20,
      textShadowColor: 'black'
    },
  }
}
const StackOptions_Guest = (title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: color_header_grey35,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 32,
      textShadowRadius: 20,
      textShadowColor: 'black'
    },
  }
}
const TabScreenOptions = () => {
  return { 
    headerShown: false,
    tabBarActiveTintColor: 'white',
    tabBarStyle: {
      backgroundColor: color_header_grey35,
    }
  }
}
const TabOptions = (title, icon) => {
  return {
    title: title,
    tabBarIcon: () => (
      <MaterialIcons name={icon} size={30} color='white' />
    ),
  }
}



function Stack_Guest() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen 
        name='Home'
        component={Guest_Home}
        options={StackOptions_Common("  Home  ")}/>
      <Stack.Screen
        name='Odds'
        component={Guest_ListOdds}
        options={StackOptions_Common("  Odds  ")}/>
      <Stack.Screen
        name='Register'
        component={Guest_Register}
        options={StackOptions_Guest(" Registar   ")}/>
      <Stack.Screen
        name='Login'
        component={Guest_Login}
        options={StackOptions_Guest(" Login   ")}/>
    </Stack.Navigator>
  );
}
function Tab_Regist() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={TabScreenOptions()}
    >
      <Tab.Screen 
        name="Tab_Home"
        component={Stack_Regist_Home}
        options={TabOptions("Home", "home")}
      />
      <Tab.Screen
        name="Tab_Odds"
        component={Stack_Regist_Odds}
        options={TabOptions("Odds", "sports-soccer")}
      />
      <Tab.Screen
        name="Tab_Favourites"
        component={Stack_Favourites}
        options={TabOptions("Favoritos", "star")}
      />
      <Tab.Screen
        name="Tab_Settings"
        component={Stack_Settings}
        options={TabOptions("Definições", "settings")}
      />
    </Tab.Navigator>
  );
}
function Tab_Admin() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={TabScreenOptions()}
    >
      <Tab.Screen 
        name="Tab_Home"
        component={Stack_Regist_Home}
        options={TabOptions("Home", "home")}
      />
      <Tab.Screen 
        name="Tab_Manage"
        component={Stack_Manage}
        options={TabOptions("Gerir", "playlist-add-check")}
      />
      <Tab.Screen
        name="Tab_Odds"
        component={Stack_Regist_Odds}
        options={TabOptions("Odds", "sports-soccer")}
      />
      <Tab.Screen
        name="Tab_Favourites"
        component={Stack_Favourites}
        options={TabOptions("Favoritos", "star")}
      />
      <Tab.Screen
        name="Tab_Settings"
        component={Stack_Settings}
        options={TabOptions("Definições", "settings")}
      />
    </Tab.Navigator>
  );
}



function Stack_Regist_Home() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen 
        name='Home'
        component={Regist_Home}
        options={StackOptions_Common("  Home  ")}/>
      <Stack.Screen
        name='Odds'
        component={Guest_ListOdds}
        options={StackOptions_Common("  Odds  ")}/>
    </Stack.Navigator>
  );
}
function Stack_Regist_Odds() {
  return (
    <Stack.Navigator initialRouteName='Leagues'>
      <Stack.Screen 
        name='Leagues'
        component={Regist_Odds_ListLeagues}
        options={StackOptions_Common("  Selecione a Liga  ")}/>
      <Stack.Screen 
        name='Games'
        component={Regist_Odds_ListGames}
        options={StackOptions_Common("  Selecione o Jogo  ")}/>
      <Stack.Screen 
        name='Odds'
        component={Regist_Odds_ListOdds}
        options={StackOptions_Common("  Ligas Disponíveis  ")}/>
    </Stack.Navigator>
  );
}
function Stack_Favourites() {
  return (
    <Stack.Navigator initialRouteName='Favourites'>
      <Stack.Screen 
        name='Favourites'
        component={Regist_Favourites}
        options={StackOptions_Common("  Favoritos  ")}/>
    </Stack.Navigator>
  );
}
function Stack_Settings() {
  return (
    <Stack.Navigator initialRouteName='Settings'>
      <Stack.Screen 
        name='Settings'
        component={Settings}
        options={StackOptions_Common("  Definições  ")}/>
    </Stack.Navigator>
  );
}
function Stack_Manage() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={Admin_Tab_Home}
        options={StackOptions_Common("  Gerir  ")}/>
      <Stack.Screen
        name='Available Odds'
        component={Admin_AvailableOdds}
        options={StackOptions_Common("  Odds Disponíveis  ")}/>
      <Stack.Screen 
        name='Available Leagues'
        component={Admin_AvailableLeagues}
        options={StackOptions_Common("  Ligas Disponíveis  ")}/>
      <Stack.Screen
        name='Daily Game Leagues'
        component={Admin_DailyGame_ListLeagues}
        options={StackOptions_Common("  Jogos Diários - Liga  ")}/>
      <Stack.Screen 
        name='Daily Game'
        component={Admin_DailyGame_ListGames}
        options={StackOptions_Common("  Jogos Diários  ")}/>
    </Stack.Navigator>
  );
}

