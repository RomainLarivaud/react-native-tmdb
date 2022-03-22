// INFO TMDB
const keyApi = "aa212f6d5e1da31a4142d73f425783b1";
const urlApi = "https://api.themoviedb.org/3/"
const language = "fr-FR"


// Search / Find

export function findMovieById(idTitle){
    /**Fonction pour trouver le film via son ID
     * @param idTitle : ID du film a chercher
     * @example
     * import {findMovieById} from './services/Services'
     * findMovieById(1256);
     */
    
    return fetch(urlApi + 'find/' + idTitle + "?api_key=" + keyApi + "&language=" + language + "&external_sourceimdb_id")
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error));
}

export function searchMovies(searchTerm, page){
     /**Fonction pour trouver le film via son nom
     * @param searchTerm : nom du film a chercher
     * @param page : numéro de la page
     * @example
     * import {searchMovies} from './services/Services'
     * searchMovies('Tenet', 2);
     */

    return fetch(urlApi + "search/movie?api_key=" + keyApi + "&language=" + language + "&query=" + searchTerm + "&page=" + page +"&include_adult=false")
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error));
}


// Filters

export function getPopular(page){
    /**Fonction pour obtenir tout les films les plus populaire
     * @param page : numéro de la page
     * @example
     * import {getPopular} from './services/Services'
     * getPopular(1);
     */

    return fetch(urlApi + "movie/popular?api_key=" + keyApi + "&language=" + language + "&page=" + page)
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error));
}

export function getTopRated(page){
    /**Fonction pour obtenir tout les films les mieux notés
     * @param page : numéro de la page
     * @example
     * import {getTopRated} from './services/Services'
     * getTopRated(1);
     */

    return fetch(urlApi + "movie/top_rated?api_key=" + keyApi + "&language=" + language + "&page=" + page)
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error));
}

export function getLatest(page){
    /**Fonction pour obtenir tout les films qui viennent de sortir
     * @param page : numéro de la page
     * @example
     * import {getLatest} from './services/Services'
     * getLatest(1);
     */

    return fetch(urlApi + "movie/latest?api_key=" + keyApi + "&language=" + language + "&page=" + page)
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error));
}

export function getUpcoming(page){
    /**Fonction pour obtenir tout les films qui vont bientot sortir
     * @param page : numéro de la page
     * @example
     * import {getUpcoming} from './services/Services'
     * getUpcoming(1);
     */

    return fetch(urlApi + "movie/upcoming?api_key=" + keyApi + "&language=" + language + "&page=" + page)
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error));
}


//Movies
export function getMovieDetails(idMovie){
    /**Fonction pour obtenir les détails sur un film en particulier
     * @param idMovie : correspond à l'ID du film
     * @example
     * import {getMovieDetails} from './services/Services'
     * getMovieDetails(movie);
     */

    return fetch(urlApi + "movie/" + idMovie + "?api_key=" + keyApi + "&language=" + language)
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error));
}

export function getMovieCredits(idMovie){
    /**Fonction pour obtenir les crédtis d'un film
     * @param idMovie : correspond à l'ID du film
     * @example
     * import {getMovieCredits} from './services/Services'
     * getMovieCredits(movie);
     */

    return fetch(urlApi + "movie/" + idMovie + "/credits?api_key=" + keyApi + "&language=" + language)
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error));
}


//Actors
export function getActorDetail(idActor){
    /**Fonction pour obtenir les détails sur un acteur
     * @param idActor : correspond à l'ID de l'acteur
     * @example
     * import {getActorDetail} from './services/Services'
     * getActorDetail(person);
     */

    return fetch(urlApi + "person/" + idActor + "?api_key=" + keyApi + "&language=" + language)
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error));
}

export function getActorFilmography(idActor){
    /**Fonction pour obtenir la filmographie d'un acteur
     * @param idActor : correspond à l'ID de l'acteur
     * @example
     * import {getActorFilmography} from './services/Services'
     * getActorFilmography(person);
     */

    return fetch(urlApi + "person/" + idActor + "/movie_credits?api_key=" + keyApi + "&language=" + language)
        .then((reponse) => reponse.json())
        .catch((error) => console.error(error));
}

// Images
export function getImage(size, path) {
    return 'https://image.tmdb.org/t/p/w'+size+path;
}