// Import de tous les éléments qu'on a besoin
import React, {Component} from 'react';
import{View, StyleSheet, FlatList} from 'react-native';
import C_SearchBar  from '../Components/C_SearchBar';
import C_Button from '../Components/C_Button';
import { StatusBar } from 'expo-status-bar';
import MovieItem from '../Components/MovieItem';
import * as G from "../global"


// Custom Component pour afficher la page d'accueil avec une barre de recherche et des films classer par catégories (Top, populaire et prochainement)
export default class S_Movie extends Component {
    //Constructeur
    constructor(props) {
        //Instancie la super classe
        super(props);

        //Nombre de page
        this.numPage = 1;
        // Total de page
        this.totalPages = 0;

        //Définie quelle forme vont prendre les paramètres movie et totalResults pour les manipuler plus facilement
        this.state = {
            movies:[],
            totalResults: 0,
        }
    }

    // Met à jour les films à chaque requête reçu
    updateMovies = (json) => {
        console.log("Update Movies  depuis S_Movie > Donnée recu", json);

        //Envoie les résultats
        this.setState({
            movies:json.results,
            totalResults:json.total_results
        })
    }

    // Permet de naviguer vers un film de l'acteur quand on clique sur celui-ci / permet de dire vers quelle page ca va envoyer
    onSelectMovie = (movie) => {
        this.props.navigation.navigate("DetailMovie", {movie:movie});
    }

    render(){
        return(

            //View qui contient le contenu de la page
            <View style={styles.container}>
                <StatusBar style="auto"/>
                {/* Affiche la search bar importé au préalable */}
                <C_SearchBar message={"Search..."} onSubmit={this.updateMovies}></C_SearchBar>
                {/* Affiche les boutons importé au préalable */}
                <C_Button onFilter={this.updateMovies}></C_Button>
                
                {/* On utilise une flat list pour afficher tout les films */}
                <FlatList 
                    //Chemin pour récupérer le nom et l'affiche du film
                    data={this.state.movies}
                    renderItem={({item, index}) => 
                    // On appelle l'objet déjà créer dans MovieItem qui correspond à l'affiche du film, son nom et son classement
                    <MovieItem movie={item} index={index+1} onSelectMovie={this.onSelectMovie}/>}
                    keyExtractor={item => item.id}
                    numColumns={G.numColumns}
                />
            </View>
        )
    }
}

// Variable qu'on appelle pour l'utiliser comme une style sheet en CSS / utilise presque les même propriétés que le CSS

const styles = StyleSheet.create({
    // Style du container qui contient tout les éléments de la page
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#171721"
    },
});