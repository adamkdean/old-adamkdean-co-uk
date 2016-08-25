---
title: Scrollable Grid with React Native 
slug: scrollable-grid-with-react-native
date: 2016-08-25 17:20
tags: 
 - react
 - react-native
 - ios
 - android
 - javascript
 - snippet
---

GridView.js

    import React, { Component } from 'react'
    import {
      AppRegistry,
      ListView,
      Image,
      StyleSheet,
      Text,
      TouchableHighlight,
      View
    } from 'react-native'

    export default class GridView extends Component {
      constructor(props) {
        super(props)
        const data = props.children || []
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
          dataSource: ds.cloneWithRows(data)
        }

        this._renderRow = this._renderRow.bind(this)
        this._selectItem = this._selectItem.bind(this)
      }

      render() {
        return (
          <View style={styles.mainView}>
            <ListView
              contentContainerStyle={styles.list}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              initialListSize={30}
            />
          </View>
        )
      }

      _renderRow (rowData, sectionId, rowId) {
        const imgSource = { uri: rowData.uri }
        console.log('imgSource', imgSource)
        return (
          <TouchableHighlight
            style={styles.row}
            onPress={() => this._selectItem(rowData)}
            underlayColor='rgba(0,0,0,0)'>
            <View>
              <Image style={styles.thumb} source={imgSource} />
            </View>
          </TouchableHighlight>
        )
      }

      _selectItem (item) {
        // do something with item
        console.log('item selected', item.id, item.uri)
      }
    }

    const styles = StyleSheet.create({
      mainView: {
        paddingTop: 22,
        flex: 1
      },
      list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#eeeeee',
        paddingTop: 8,
      },
      row: {
        justifyContent: 'center',
        margin: 6,
        width: 64,
        height: 64,
        alignItems: 'center'
      },
      thumb: {
        width: 64,
        height: 64
      }
    })

index.ios.js

    'use strict'

    import React, { Component } from 'react'
    import { AppRegistry, StyleSheet, View, Text } from 'react-native'
    import GridView from './GridView'

    class ReactApp extends Component {
      constructor(props) {
        super(props)

        this.state = {
          data: []
        }

        for (let i = 0; i < 100; i++) {
          this.state.data.push({
            id: i,
            uri: 'https://facebook.github.io/react/img/logo_og.png'
          })
        }    
      }

      render() {
        return (
          <GridView>{this.state.data}</GridView>
        )
      }
    }

    AppRegistry.registerComponent('reactapp', () => ReactApp)

