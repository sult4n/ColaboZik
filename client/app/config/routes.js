import { createSwitchNavigator, createStackNavigator} from 'react-navigation'

import {displayName as appName} from '../../app.json'
import AuthLoading from '../screens/authLoading'
import Home from '../screens/home'
import AddRoom from '../screens/addRoom'
import ListRooms from '../screens/listRooms'
import Room from '../screens/room'
import Player from '../screens/player'
import AddTrack from '../screens/addTrack'

const optionsGeneral = {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'AuthLoading'
}

const LoggedUser = createStackNavigator({
  ListRooms: {
    screen: ListRooms,
    navigationOptions: {
      title: 'Liste des salons'
    }
  },
  AddRoom: {
    screen: AddRoom,
    navigationOptions: {
      title: 'Ajouter un salon'
    }
  },
  Room: {
    screen: Room,
    navigationOptions: ({navigation}) => {
      return {
        title: navigation.getParam('room', 'Salon').title,
      }
    }
  },
  AddTrack: {
    screen: AddTrack,
    navigationOptions: {
      title: 'Ajouter une piste'
    }
  },
  Player : {
    screen: Player,
    navigationOptions: {
      title: 'Player'
    }
  }
})

const DisconnectedUser = createStackNavigator ({
  Home: {
    screen: Home,
    navigationOptions: {
      title: appName
    }
  },
})

export default createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoading,
      navigationOptions: {
        title: appName
      }
    },
    Connected: {
      screen: LoggedUser
    },
    Disconnected: {
      screen: DisconnectedUser
    }
  },
  optionsGeneral
)
