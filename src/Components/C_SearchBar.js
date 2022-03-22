// Import de tous les éléments qu'on a besoin
import React from 'react';
import {StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import * as Services from '../services/Services';


// Custom Component pour faire une barre de recherche
export default class C_SearchBar extends React.Component {
    //Constructeur
    constructor(props){
        //Instancie la super classe
        super(props);

        //State du composant
        this.state = {
            inputValue: this.props.message,
        }
    }

    onChangeText = (text) => {
        //Modifie le state pour conserver le texte saisi par l'utilisateur
        this.setState({inputValue:text})
    }

    onFocus = () => {
        this.setState({inputValue:""})
    }

    onSubmit = () => {
        // Va envoyer le texte envoyer dans la search bar
        console.log("Texte à rechercher:", this.state.inputValue);
        Services.searchMovies(this.state.inputValue,1).then(json =>{
            console.log(json);
            this.props.onSubmit(json);
        })
    }

    // Méthode pour rendre les éléments graphiques associés au composant
    render() {
        return (
            <SearchBar 
            //Valeur afficher dans la search barre
            value={this.state.inputValue}

            onChangeText = {this.onChangeText}
            onFocus = {this.onFocus}
            onSubmitEditing = {this.onSubmit}
            //Style de la barre
            containerStyle = {styles.container}
            inputContainerStyle={styles.inputContainer}
            inputStyle = {styles.input}
            //Input color
            searchIcon = {{color:"#EFC28D"}}
            clearIcon = {{color:"#EFC28D"}}
            ></SearchBar>
        )
    }
}

// Variable qu'on appelle pour l'utiliser comme une style sheet en CSS / utilise presque les même propriétés que le CSS

const styles = StyleSheet.create({
    //Style du container de la bar etdes éléments dedans
    container: {
        width:"100%",
        backgroundColor:"transparent",
        borderColor:"transparent",
        borderBottomColor:"transparent",
        borderTopColor:"transparent",
    },
    //Style du container de la bar en elle même
    inputContainer: {
        marginTop:10,
        height:40,
        backgroundColor: "#2C2C34",
        padding:2,
        borderRadius: 10,
    },
    //Style de la bar
    input:{
        fontSize:16,
        color:"#EFC28D",
    }
});