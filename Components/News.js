// ./Components/News.js

import React from 'react'
import { StyleSheet, View, ActivityIndicator  } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import { getLastFilmsOutFromApi } from '../API/TMDBApi'

class News extends React.Component {
    
    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = { news: [],
        isLoading : false }
        this._loadFilms = this._loadFilms.bind(this)
        // On bind this a la fonction _loadFilms pour avoir le context de search dans le component FilmList.
        // bounded function
    }

    _loadFilms() {
        this.setState({ isLoading: true }) // on lance le chargement
        getLastFilmsOutFromApi(this.page + 1).then(data => {
            this.page = data.page
            this.totalPages = data.total_pages
            this.setState({ news : this.state.news.concat(data.results),
            isLoading: false })
        })
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

    componentWillMount()
    {
        this._loadFilms()
    }
    
      render() {
        return (
          <View style={ styles.main_container }>
            <FilmList
              films={this.state.news}
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
export default News
