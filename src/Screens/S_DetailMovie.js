// Import de tous les éléments qu'on a besoin
import React, {Component} from 'react'
import{Text, Image, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import * as Services from '../services/Services'
import * as G from "../global"


// Permet d'utiliser la taille de l'écran pour que l'app s'adapte un minimum à chaque écran
const size = G.wSC / G.numColumns - 10;

// Custom Component pour afficher les détails sur un film
export default class S_DetailMovie extends Component {
    //Constructeur
    constructor(props){
        //Instancie la super classe
        super(props);

        // Raccourcie pour récupérer les informations sur le film en question
        this.movie = this.props.route.params.movie;

        //Définie quelle forme vont prendre les paramètres details et casting pour les manipuler plus facilement
        this.state = {
            details:{},
            casting:[]
        }

        // On a écrit au préalable les chemins dans Services pour récupérer tout les détails dans l'api
        // On récupère via la page Services les détails du film
        Services.getMovieDetails(this.movie.id)
        .then(json=> {
            console.log(json);
            this.setState({details:json});

            // On récupère via la page Services les acteurs du film
            Services.getMovieCredits(this.movie.id)
            .then(json => {
                console.log(json)
                this.setState({casting:json.cast})
            })
        })
        console.log(this.movie)
    } 

    render(){

        // Permet de naviguer vers un acteur du film quand on clique sur celui-ci / permet de dire vers quelle page ca va envoyer
        const onSelectActor = (person) => {
            this.props.navigation.push("DetailActor", {person:person});
        }

        return(

            //View qui contient le contenu de la page
            <View style={styles.container}>

                {/* View qui contient l'affiche du film, et la view avec les infos importantes */}
                <View style={styles.viewImg}>
                    {/* Affiche du film */}
                    <Image style={{width: size -105, height: 80*1.7, borderRadius: 10}} source={{uri: Services.getImage(154, this.movie.poster_path)}}/>
                    {/* View qui contient les infos importantes */}
                    <View style ={styles.viewTitle}>
                        {/* Nom du film */}
                        <Text style={{color: "#EFC28D", fontWeight: "bold", fontSize: 24, height: 60}}>{this.movie.title}</Text>
                        {/* La note du film */}
                        <Text style={{color: "#EFC28D"}}>{"Note : " + this.state.details.vote_average + " / 10"}</Text>
                        {/* Date de sortie */}
                        <Text style={{color: "#EFC28D"}}>{"Date de sortie : " + this.state.details.release_date}</Text>
                        {/* Durée du film */}
                        <Text style={{color: "#EFC28D"}}>{"Durée : " + this.state.details.runtime + " min"}</Text>
                    </View>
                </View>

                {/* View qui contient les genres du films */}
                <View style ={styles.viewGenre}>
                    {/* Genres */}
                    <Text style={{color : "#EFC28D", fontWeight: "bold"}}>Genres</Text>
                    {/* On utilise une flat list pour afficher tout les genres successivements */}
                    <FlatList 
                            // Chemin pour chercher les genres
                            data={this.state.details.genres}
                            // Ce que va contenir la flat list
                            renderItem={({item}) => 
                            // Texte des genres
                            <Text style ={{marginRight:4, marginLeft: 4,marginTop: 15,fontSize: 12,padding: 8, color: "#EFC28D", borderWidth: 1, borderColor: "#EFC28D", borderRadius : 5}}> {item.name} </Text>}
                            keyExtractor={item => item.id}
                            horizontal={true}
                    />
                </View>

                {/* View qui contient la description du film */}
                <View style={styles.viewDesc}>
                    {/* Description */}
                    <Text style={{color : "#EFC28D", fontWeight: "bold", fontSize: 16, paddingBottom: 10}}>Description :</Text>
                    {/* Texte de la description */}
                    <Text style={{color : "#EFC28D"}}>{this.state.details.overview}</Text>
                </View>

                {/* View qui contient la liste des acteurs */}
                <View style={styles.viewActeur}>
                    {/* Acteur */}
                    <Text style={{color : "#EFC28D", fontWeight: "bold", fontSize: 20, marginBottom: 10, paddingTop: 10}}>Acteurs</Text>
                    {/* On utilise une flat list pour bien afficher successivement tout les acteurs avec leur nom */}
                    <FlatList 
                        // Chemin qui sélectionne les acteurs
                        data={this.state.casting}
                        renderItem={({item}) => 
                        
                        // On utilise touchable pour rendre les objets cliquables et pour naviguer vers ca page
                        <TouchableOpacity onPress={() => onSelectActor(item)} style={styles.touchableStyle}>
                            {/* Nom de l'acteur */}
                            <Text style={{fontSize:14, fontWeight:'bold', color:"#fff", position:'absolute', bottom: 0, left: 0, zIndex:5, width: size -40, paddingBottom:5, paddingLeft: 8}}>{item.name}</Text>
                            {/* Photo de l'acteur */}
                            <Image style={{width: size -40, height: 154*1.7, borderRadius: 10,}} source={{uri: Services.getImage(154, item.profile_path)}} />             
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
    // Style de la view qui contient l('affiche du film et les infos importantes
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
    //Style de la view qui contient les genres du film
    viewGenre : {
        flex:0,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        width: 380,
        marginLeft: 15,
    },
    //Style de la view qui contient la description du film
    viewDesc: {
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
    //Style de la view qui contient la liste des acteurs du film
    viewActeur:{
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
    // Style des acteurs cliquables
    touchableStyle:{
        width: size - 40,
        backgroundColor: "#2C2C34",
        margin: 11,
        borderRadius: 10,
        position: "relative",
    }
});