// Components/Home.js

import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import { getFilmsOutThisYearFromApi } from '../API/TMDBApi'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = "Star wars"
    this.page = 0
    this.totalPages = 0
    this.state = { films: [],
    isLoading : false }
    this._loadFilms = this._loadFilms.bind(this)
    // On bind this a la fonction _loadFilms pour avoir le context de search dans le component FilmList.
    // bounded function
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

  _loadFilms() {
    if (this.state.film === undefined)
    {
        this.setState({ isLoading: true }) // on lance le chargement
        getFilmsOutThisYearFromApi().then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({ films : this.state.films.concat(data.results),
          isLoading: false })
          console.log(this.state.films)

        })
      }
  }

  render() {
    return (
      <View style={ styles.main_container }>
              {this._loadFilms()}
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          isfavoriteList={false}/>
        {this._displayLoading()}

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
  }
})
const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Home)
