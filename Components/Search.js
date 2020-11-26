// Components/Search.js
import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import FilmDetail from './FilmDetail'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux';

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = { films: [],
    isLoading : false }
    this._loadFilms = this._loadFilms.bind(this)
    // On bind this a la fonction _loadFilms pour avoir le context de search dans le component FilmList.
    // bounded function
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    }, () => { // Callback de la fonction ASYNCH de setState
      this._loadFilms()
    })
  }

  _loadFilms() {
      if (this.searchedText.length > 0) {
        this.setState({ isLoading: true }) // on lance le chargement
        getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({ films : this.state.films.concat(data.results),
          isLoading: false })
        })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
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

  render() {
    return (
      <View style={ styles.main_container }>
        <TextInput style={styles.textinput } placeholder='Titre du film'
        onChangeText={(text) => this._searchTextInputChanged(text)}
        onSubmitEditing={() => this._searchFilms()}
        />
        <View  style={styles.buttoninput}>
          <Button title='Rechercher'  onPress={() => this._searchFilms()}/>
        </View>
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
    textinput: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    marginBottom:5
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
    buttoninput: {
      width: '100%',
      alignItems: 'center',
      marginBottom:5
    }
})

export default Search
