import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform } from 'react-native';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import EnlargeShrink from '../Animations/EnlargeShrink'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film : undefined,
      isLoading : true
    }
  }

  _shareFilm() {
    const { film } = this.state
    Share.share({ title: film.title, message: film.overview })
  }

  _displayFloatingActionButton() {
    const { film } = this.state

    if (film != undefined && Platform.OS === 'android')
    {
      return (
          <TouchableOpacity
            style={styles.share_touchable_floatingactionbutton}
            onPress={() => this._shareFilm()}>
            <Image
              style={styles.share_image}
              source={require('../Images/ic_share.android.png')} />
          </TouchableOpacity>
      )
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayFavoriteImage() {
    var sourceImage = require('../Images/ic_favorite_border.png')
    let enlarge = false;

    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../Images/ic_favorite.png')
      enlarge = true;

    }

    return (
      <EnlargeShrink shouldEnlarge={enlarge}>
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      </ EnlargeShrink>
    )
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
    this.props.dispatch(action) // on appel dispatch en passant pas le store
  }

  _displayFilm() {
    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
        <Image
          style={ styles.image_container }
          source={{uri: getImageFromApi(this.state.film.poster_path)}}
        />
        <Text style={styles.title_text}>{this.state.film.title}</Text>
        <TouchableOpacity
          style={styles.favorite_container}
          onPress={() => this._toggleFavorite()}>
          {this._displayFavoriteImage()}
        </TouchableOpacity>
        <Text style={ styles.description_text } numberOfLines={13}>{this.state.film.overview}</Text>
        <Text style={styles.default_text}>Sorti le {moment(this.state.film.release_date).format("DD/MM/YYYY")}</Text>
        <Text style={styles.default_text}>Note : {this.state.film.vote_average}</Text>
        <Text style={styles.default_text}>Nombre de votes : {this.state.film.vote_count}</Text>
        <Text style={styles.default_text}>Budget : {numeral(this.state.film.revenue).format('0,0[.]00) $')}</Text>
        <Text style={styles.default_text}>Genre(s) : {this.state.film.genres.map(function(genre){
              return genre.name;}).join(" / ")}</Text>
        <Text style={styles.default_text}>Compagnie(s) : {this.state.film.production_companies.map(function(company) {
             return company.name; }).join(" / ")}</Text>
        {this._displayFloatingActionButton()}
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }

// appelle apres le render et mets a jour le state
  componentDidMount() {
    getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false,
        shouldEnlarge: this.state.shouldEnlarge
      })
    })
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image_container: {
    height: 210,
    margin: 5
  },
  title_text: {
    fontSize: 22,
    fontSize: 35,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color : 'grey',
    margin: 5,
    marginBottom: 15,
    alignItems : 'flex-start'
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center'
  },
  favorite_image: { // image s'adapte a l'espace disponible
    flex:1,
    width: null,
    height: null
  },
  share_touchable_floatingactionbutton: {
   position: 'absolute',
   width: 60,
   height: 60,
   right: 30,
   bottom: 50,
   borderRadius: 30,
   backgroundColor: '#e91e63',
   justifyContent: 'center',
   alignItems: 'center'
 },
 share_image: {
   width: 30,
   height: 30
 }
})

const mapStateToProps = (state) => {
  return { favoritesFilm: state.toggleFavorite.favoritesFilm }
} // on map le state de lappli aux props du component filmDetail

export default connect(mapStateToProps)(FilmDetail) // connecte le store au component
// on veut le state de lappli donc on ajoute la fonction mapStateToProps
// des que le store et state sont mis a jour, le component va etre informe.
