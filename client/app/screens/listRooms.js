import React, {Component} from 'react'
import {View, FlatList} from 'react-native'
import {Fab, Icon, List, ListItem} from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RoomCard from '../components/roomCard'

const ScrollRooms = styled.ScrollView`
  padding: 10px;
`

export default class ListRooms extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  rooms = [{
    name: 'Room #1',
    description: 'Playlist pour la soirée chez Ronan.'
  }, {
    name: 'Room #2',
    description: 'Super musique dans le style metal, heavy metal et grunge'
  }, {
    name: 'Room #3',
    description: 'abc...'
  }, {
    name: 'Room #4',
    description: 'abc...'
  }, {
    name: 'Room #5',
    description: 'abc...'
  }, {
    name: 'Room #6',
    description: 'abc...'
  }]

  _roomCard = ({item}) =>
    <RoomCard room={item} navigation={this.props.navigation}/>

  render() {
    const {navigation} = this.props

    return (
      <View style={{flex: 1}}>
        <ScrollRooms>
          <FlatList data={this.rooms}
                    renderItem={this._roomCard}
                    keyExtractor={(item) => item.name}/>
        </ScrollRooms>

        <Fab
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={() => navigation.navigate('AddRoom')}>
          <Icon name="add"/>
        </Fab>
      </View>
    )
  }
}