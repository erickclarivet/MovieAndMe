import React from 'react';
import {StyleSheet, Image, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

import Search from './Components/Search';
import FilmDetail from './Components/FilmDetail';
import Favorites from './Components/Favorites';
import News from './Components/News';
import Store from './Store/configureStore';

const NewsStack = createStackNavigator();
const SearchStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function SearchScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} options={{title:'Rechercher'}} />
      <SearchStack.Screen name="FilmDetail" component={FilmDetail} options={{title:'Rechercher'}} />
    </SearchStack.Navigator>
  )
}

function FavoritesScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={Favorites} options={{title:'Favoris'}} />
      <SearchStack.Screen name="FilmDetail" component={FilmDetail} options={{title:'Favoris'}} />
    </FavoritesStack.Navigator>
  )
}

function NewsScreen() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen name="News" component={News} options={{title:'News'}} />
      <NewsStack.Screen name="FilmDetail" component={FilmDetail} options={{title:'News'}} />
    </NewsStack.Navigator>
  )
}

export default class App extends React.Component {
  render() {
    let persistor = persistStore(Store) // Renvoie le store persisté (permet la sauvegarde)
    // 'PersistGate' rehydrate les components enfants (remet les info à la fermeture et re ouverture de lappli)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>  
          <NavigationContainer>
            <BottomTab.Navigator>
            <BottomTab.Screen name="NewsScreen" component={NewsScreen} options={{
              title: 'Nouveaux films',
              tabBarIcon: () => {
              return <Image
                source={require('./Images/ic_fiber_new.png')}
                style={styles.icon}/>}}}/>
                <BottomTab.Screen name="SearchScreen" component={SearchScreen}
                  options={{
                    title: 'Rechercher',
                    tabBarIcon: () => {
                      return <Image
                        source={require('./Images/ic_search.png')}
                        style={styles.icon}/>
                  }}}/>
                <BottomTab.Screen name="Favorites" component={FavoritesScreen}
                  options={{
                    title: 'Favoris',
                    tabBarIcon: () => {
                    return <Image
                      source={require('./Images/ic_favorite.png')}
                      style={styles.icon}/>
                  }}}/>
              </BottomTab.Navigator>
            </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30 
  }
})
