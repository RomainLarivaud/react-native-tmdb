// Import de tous les éléments qu'on a besoin

import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import S_Movie from './src/Screens/S_Movie'
import S_DetailMovie from './src/Screens/S_DetailMovie'
import S_DetailActor from './src/Screens/S_DetailActor'

// Création de la navigation dans l'appli
let RootStack = createStackNavigator();

export default function App() {
  return (
    // Contenaire permettant de navigué entre les différentes page existentes
    // RootStack.Screen correspond au différente page de l'appli : Accueil (Movie) / Details des films (DetailMovie) / Details des acteurs (DetailActor)
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Movie" component={S_Movie} options={{title : "Accueil", headerStyle: {backgroundColor :"#171721"}, headerTitleAlign: 'center', headerTintColor: "#EFC28D"}} />
        <RootStack.Screen name="DetailMovie" component={S_DetailMovie} options={{title : "Détails du film", headerStyle: {backgroundColor :"#171721"}, headerTitleAlign: 'center', headerTintColor: "#EFC28D"}} />
        <RootStack.Screen name="DetailActor" component={S_DetailActor} options={{title : "Détails de l'acteur", headerStyle: {backgroundColor :"#171721"}, headerTitleAlign: 'center', headerTintColor: "#EFC28D"}} />
      </RootStack.Navigator>
    </NavigationContainer>
   );
}