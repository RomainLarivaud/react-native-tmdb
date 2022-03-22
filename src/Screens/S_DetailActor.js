// Import de tous les éléments qu'on a besoin
import React, {Component} from 'react'
import{Text, Image, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import * as Services from '../services/Services'
import * as G from "../global"


// Permet d'utiliser la taille de l'écran pour que l'app s'adapte un minimum à chaque écran
const size = G.wSC / G.numColumns - 10;

// Custom Component pour afficher les détails sur un acteur
export default class S_DetailActor extends Component {
    //Constructeur
    constructor(props){
        //Instancie la super classe
        super(props);

        // Raccourcie pour récupérer les informations sur l'acteur en question
        this.person = this.props.route.params.person;

        //Définie quelle forme vont prendre les paramètres details et casting pour les manipuler plus facilement
        this.state = {
            details:{},
            casting:[]
        }
        
        // On a écrit au préalable les chemins dans Services pour récupérer tout les détails dans l'api
        // On récupère via la page Services les détails de l'acteur
        Services.getActorDetail(this.person.id)
        .then(json=> {
            console.log(json);
            this.setState({details:json});

            // On récupère via la page Services la filmographie de l'acteur
            Services.getActorFilmography(this.person.id)
            .then(json => {
                console.log(json)
                this.setState({casting:json.cast})
            })
        })
        console.log(this.person)
    }

    render(){
        
        // Permet de naviguer vers un film de l'acteur quand on clique sur celui-ci / permet de dire vers quelle page ca va envoyer
        const onSelectMovie = (movie) => {
            this.props.navigation.push("DetailMovie", {movie:movie});
        }

        return(
            //View qui contient le contenu de la page
            <View style={styles.container}>

                {/* View qui contient la photo de l'acteur, et la view avec les infos importantes */}
                <View style={styles.viewImg}>
                    {/* Photo de l'acteur */}
                    <Image style={{width: size -105, height: 80*1.7, borderRadius: 10}} source={{uri: Services.getImage(154, this.person.profile_path)}}/>
                    {/* View qui contient les infos importantes */}
                    <View style ={styles.viewTitle}>
                        {/* Nom de l'acteur */}
                        <Text style={{color: "#EFC28D", fontWeight: "bold", fontSize: 24, height: 60}}>{this.person.name}</Text>
                        {/* Popularité de l'acteur */}
                        <Text style={{color: "#EFC28D"}}>{"Popularité : " + this.state.details.popularity}</Text>
                        {/* Date et lieu de naissance */}
                        <Text style={{color: "#EFC28D"}}>{"Née le " + this.state.details.birthday + " à " + this.state.details.place_of_birth}</Text>
                    </View>
                </View>

                {/* View qui contient la biographie de l'acteur */}
                <View style={styles.viewBio}>
                    {/* Biographie */}
                    <Text  style={{color : "#EFC28D", fontWeight: "bold", fontSize: 16, paddingBottom: 10}}>Biographie :</Text>
                    {/* Texte de la biographie */}
                    <Text numberOfLines={8} style={{color : "#EFC28D"}}>{this.state.details.biography}</Text>
                </View>

                {/* View qui contient la filmographie de l'acteur */}
                <View style={styles.viewFilm}>
                    {/* Filmographie */}
                    <Text style={{color : "#EFC28D", fontWeight: "bold", fontSize: 20, marginBottom: 10, paddingTop: 10}}>Filmographie</Text>
                    {/* On utilise une flatlist pour afficher succesivement tout les films dans une même liste afin de les manipuler en groupe et de pouvoir scroller à l'intérieur de la liste */}
                    <FlatList 
                        data={this.state.casting}
                        renderItem={({item}) => 
                        
                        // On utilise touchable opacity pour rendre les films cliquables afin d'aller sur leur page
                        <TouchableOpacity 
                        // Au clique, redirige sur la page du film
                        onPress={() => onSelectMovie(item)}
                        style={styles.touchableStyle}>
                            {/* Nom du film */}
                            <Text style={{fontSize:14, fontWeight:'bold', color:"#fff", position:'absolute', bottom: 0, left: 0, zIndex:5, width: size -40, paddingBottom:5, paddingLeft: 8}}>{item.title}</Text>
                            {/* Affiche du film */}
                            <Image style={{width: size -40, height: 154*1.7, borderRadius: 10,}} source={{uri: Services.getImage(154, item.poster_path)}} />             
                        </TouchableOpacity>}
                        
                        keyExtractor={item => item.id}
                        // Définit le nombre de colonne
                        numColumns={G.numColumns}
                    />
                </View>
            </View>
        )
    }
}

// Variable qu'on appelle pour l'utiliser comme une style sheet en CSS / utilise presque les même propriétés que le CSS

const styles = StyleSheet.create({
    //Style du container qui contient tout les éléments de la page
    container: {
        color: "#EFC28D",
        backgroundColor: "#171721",
    },
    // Style de la view qui contient la photo de l'acteur et les infos importantes
    viewImg: {
        flex: 0,
        flexDirection: "row",
        marginLeft: 15,
        marginTop :20,
    },
    // Style de la view qui contient les infos importantes
    viewTitle :{
        marginLeft : 20,
        backgroundColor : "#2C2C34",
        width : 268,
        borderRadius : 10,
        paddingRight: 10,
        paddingBottom : 10,
        paddingLeft : 15,
        paddingTop: 7,
    },
    //Style de la view qui contient la biographie
    viewBio: {
        backgroundColor : "#2C2C34",
        borderRadius : 10,
        paddingRight: 10,
        paddingBottom : 10,
        paddingLeft : 15,
        paddingTop: 7, 
        marginLeft: 15,
        marginTop: 20,
        width: 380
    },
    //Style de la view qui contient la filmographie
    viewFilm:{
        flex:0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : "#2C2C34",
        width: 380,
        marginLeft: 15,
        marginTop: 20,
        borderRadius : 10,
    },
    // Style des films cliquables
    touchableStyle:{
        width: size - 40,
        backgroundColor: "#2C2C34",
        margin: 11,
        borderRadius: 10,
        position: "relative",
    }
});