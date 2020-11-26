import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Film dans nos favoris
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }

  render() {
    const film = this.props.film
    const displayDetailForFilm = this.props.displayDetailForFilm
    return (
      <FadeIn>
        <TouchableOpacity style={ styles.main_container}
              onPress={() => displayDetailForFilm(film.id)}>
          <Image
            style={ styles.image_container }
            source={{ uri:getImageFromApi(film.poster_path) }}
          />
            <View style={ styles.content_container }>
              <View style={ styles.header_container }>
                {this._displayFavoriteImage()}
                <Text style={ styles.title_text }>{film.original_title}</Text>
                <Text style={ styles.vote_text }>{film.vote_average}</Text>
              </View>
              <Text style={ styles.description_text } numberOfLines={6}>{film.overview}</Text>
              <Text style={ styles.date_text }>Sorti le {film.release_date}</Text>
            </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
    main_container: {
    height: 190,
    flexDirection : 'row',
    borderWidth:1
  },
    image_container: {
    height: 178,
    flex: 2,
    margin: 5
  },
    content_container: {
    height: 190,
    flex: 4,
    margin: 5
  },
    header_container: {
    flexDirection : 'row',
    flex: 3
  },
    title_text: {
    fontSize: 19,
    fontWeight: 'bold',
    flex: 3,
    flexWrap: 'wrap',
    alignItems : 'flex-start'
  },
    vote_text: {
    fontSize: 25,
    fontWeight: 'bold',
    color : 'grey',
    flex: 1,
    alignItems : 'flex-end',
    textAlign:'right'
  },
    description_text: {
    fontStyle: 'italic',
    color : 'grey',
    flex: 7,
    alignItems : 'flex-start'
  },
    date_text: {
    flex: 2,
    textAlign: 'right',
    fontSize: 14,
    justifyContent : 'flex-end'
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default FilmItem
