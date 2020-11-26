// Components/Favorites.js

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import Avatar from './Avatar'

class Favorites extends React.Component {

  render() {
    return (
      <View style={ styles.main_container }>
        <View style={styles.avatar_container}>
          <Avatar/>
        </View>
        <FilmList
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          isfavoriteList={true} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
      flex: 1
  },
  loading_container : {
    position: 'absolute', // =/= relative, il positionne un element dans la vue s'en tenir compte des autres.
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar_container: {
    alignItems: 'center'
  }
})
const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)
