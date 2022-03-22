// Import de tous les éléments qu'on a besoin
import React, { Component } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getImage} from "../services/Services"
import * as G from "../global"


// Permet d'utiliser la taille de l'écran pour que l'app s'adapte un minimum à chaque écran
const size = G.wSC / G.numColumns - 10;

// Custom Component pour afficher les films sur la page d'accueil
export default class MovieItem extends Component{
    //Constructeur
    constructor(props){
        //Instancie la super classe
        super(props);
    }

    render(){
        //Raccourcie pour récupérer les infos des films stoquer dans la variable film
        const movie = this.props.movie;

        return(
            // Liste cliquable contenant les films avec leur nom et leur classement dans la recherche
            <TouchableOpacity 
                onPress={() => this.props.onSelectMovie(movie)}
                style={styles.itemContainer}>
                    {/* Numéro du film dans la recherche */}
                <Text style={{position:"absolute", zIndex: 5, color: "#fff", fontWeight:"bold", top:0, right:0, paddingRight:10, paddingTop: 8, paddingLeft:10, paddingBottom:8, backgroundColor: "#EFC28D", borderBottomLeftRadius:10, borderTopRightRadius: 10}}>{this.props.index}</Text>
                    {/* Nom du film */}
                <Text style={{fontSize:18, fontWeight:'bold', color:"#fff", position:'absolute', bottom: 0, left: 0, zIndex:5, width: size -20, paddingBottom:5, paddingLeft: 8}}>{movie.title}</Text>
                    {/* Affiche du film */}
                <Image style={{width: size -20, height: 154*1.7, borderRadius: 10,}} source={{uri: getImage(154, movie.poster_path)}}/>
            </TouchableOpacity>
        )
    }
}

// Variable qu'on appelle pour l'utiliser comme une style sheet en CSS / utilise presque les même propriétés que le CSS

const styles = StyleSheet.create({
    // Style de la touchable opacity qui onctient les textes et les images des films
    itemContainer: {
        width: size - 20,
        backgroundColor: "#2C2C34",
        margin: 16,
        borderRadius: 10,
        position: "relative",
    }
});