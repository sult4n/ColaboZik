import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Fab, Icon } from 'native-base'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import MusicsList from '../components/musicsList'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`

const ScrollMusic = styled.ScrollView`
  padding: 10px;
`

class Playlist extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    theme: PropTypes.object,
    actions: PropTypes.object,
    musics: PropTypes.array,
    playlists: PropTypes.array
  }

  componentDidMount() {
    const { navigation, actions } = this.props
    const playlist = navigation.getParam('playlist', undefined)

    if (!playlist) navigation.goBack()

    actions.playlists.selectPlaylist(playlist)
    actions.musics.loadMusic(playlist._id)
  }

  componentWillUnmount() {
    const { actions } = this.props

    actions.playlists.deselectPlaylist()
    actions.musics.unloadMusic()
  }

  render() {
    const { navigation, musics, theme } = this.props

    return (
      <BackgroundView>
        <ScrollMusic>
          <MusicsList musics={musics} navigation={navigation}/>
          <Text/>
        </ScrollMusic>

        <Fab
          style={{ backgroundColor: theme.color.button }}
          position="bottomRight"
          onPress={() => navigation.navigate('AddMusic')}>
          <Icon name="add"/>
        </Fab>

        <Fab
          style={{ backgroundColor: theme.color.button }}
          position="bottomLeft"
          onPress={() => navigation.navigate('Player')}>
          <Icon name="play"/>
        </Fab>
      </BackgroundView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    musics: bindActionCreators(allTheActions.musics, dispatch),
    playlists: bindActionCreators(allTheActions.playlists, dispatch)
  }
})

const mapStateToProps = state => ({
  musics: state.musics.musics,
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist)
