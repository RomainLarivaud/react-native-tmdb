// Import de tous les éléments qu'on a besoin
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import * as Services from '../services/Services'


// Custom Component pour faire une barre de recherche
export default class C_Button extends React.Component {
    //Constructeur
    constructor(){
        //Instancie la super classe
        super();

    }

    // Méthode pour rendre les éléments graphiques associés au composant
    render() {
        return (
            // View qui va être utilise rcomme un conteneur pour  regrouper les 3 boutons
            <View style={styles.viewContainer}>

                {/* /////// BOUTON TOP ///// */}
                <Button
                    buttonStyle={styles.button}
                    title={"Top"}
                    titleStyle = {{color:"#EFC28D"}} 
                    onPress={() => {
                        Services.getTopRated(1).then(json =>{
                            this.props.onFilter(json);
                        })
                    }}>
                </Button>

                {/* /////// BOUTON POPULAIRE ///// */}
                <Button
                    buttonStyle={styles.button}
                    title={"Populaire"}
                    titleStyle = {{color:"#EFC28D"}} 
                    onPress={() => {
                        Services.getPopular(1).then(json =>{
                            this.props.onFilter(json);
                        })
                    }}>
                </Button>

                {/* /////// BOUTON PROCHAINEMENT ///// */}
                <Button
                    buttonStyle={styles.button}
                    title={"Prochainement"}
                    titleStyle = {{color:"#EFC28D"}} 
                    onPress={() => {
                        Services.getUpcoming(1).then(json =>{
                            this.props.onFilter(json);
                        })
                    }}>
                </Button>
            </View>
            
        )
    }
}

// Variable qu'on appelle pour l'utiliser comme une style sheet en CSS / utilise presque les même propriétés que le CSS

const styles = StyleSheet.create({
    //Style des boutons
    button: {
        backgroundColor: "#2C2C34",
        margin: 3,
        width: 128,
        borderRadius: 10,
        fontSize: 10,
    },
    //Style de la view qui contient les boutons
    viewContainer: {
        justifyContent: "center",
        flexDirection : "row",
        width:"28%",
        marginBottom:10,
    }
});