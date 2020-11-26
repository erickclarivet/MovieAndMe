// Animations.FadeIn.js

// externalisation de l'animation pour la reutiliser
import React from 'react'
import { Animated, Dimensions } from 'react-native'


class FadeIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      positionLeft: new Animated.Value(Dimensions.get('window').width)
    }
  }

  render() {
    return (
      <Animated.View
        style={{ left: this.state.positionLeft }}>
        {this.props.children}
      </Animated.View>
    )
  }

  componentDidMount() {
    Animated.spring(
      this.state.positionLeft,
      {
        toValue: 0
      }
    ).start()
  }
}

export default FadeIn
