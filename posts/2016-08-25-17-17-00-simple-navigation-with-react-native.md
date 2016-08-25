---
title: Simple navigation with React Native 
slug: simple-navigation-with-react-native
date: 2016-08-25 17:17
tags: 
 - react
 - react-native
 - ios
 - android
 - javascript
 - snippet
---
    import React, { Component } from 'react'
    import { AppRegistry, Navigator, Text, TouchableHighlight, View } from 'react-native'

    class Home extends Component {
      render() {
        return (
          <View>
            <Text>This is HOME.</Text>
            <TouchableHighlight onPress={ () => { this._navigate() }}>
              <Text>Go To About</Text>
            </TouchableHighlight>
          </View>
        )
      }
      _navigate() {
        this.props.navigator.push({
          name: 'About'
        })
      }
    }

    class About extends Component {
      render() {
        return (
          <View>
            <Text>This is ABOUT.</Text>
            <TouchableHighlight onPress={ () => { this._navigate() }}>
              <Text>Go Back</Text>
            </TouchableHighlight>
          </View>
        )
      }
      _navigate() {
        this.props.navigator.pop()
      }
    }

    class ReactApp extends Component {
      render() {
        return (
          <Navigator
            style={{ flex: 1, paddingTop: 22  }}
            initialRoute={{ name: 'Home' }}
            renderScene={ this._renderScene } />
        )
      }

      _renderScene(route, navigator) {
        console.log(route)
        if(route.name === 'Home') return <Home navigator={navigator} {...route.passProps} />
        if(route.name === 'About') return <About navigator={navigator} {...route.passProps} />
      }
    }

    AppRegistry.registerComponent('reactapp', () => ReactApp)
