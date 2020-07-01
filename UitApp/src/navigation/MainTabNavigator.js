import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import colors from '../components/Common/Colors';
import { APPBAR_HEIGHT } from '../components/Common/Dimension';
import MenuScreen from '../screens/MenuScreen';
import ratting from '../components/rating/rating';
import group from '../components/chatting/group';
import chat from '../components/chatting/chatting';
import CreateGroup from '../components/chatting/creategroup';
import listFriend from '../components/chatting/listFriend';
import NewChatting from '../components/chatting/newchatting';
import Addmember from '../components/menu/Addmember'
import viewgroupInfo from '../components/chatting/viewgroupInfo'
import viewTree from '../components/chatting/groupInfo/viewTree'
import viewGroup from '../components/chatting/groupInfo/viewGroup'
import viewDirectPathInfo from '../components/chatting/groupInfo/viewDirectPath_Info'
import viewUserInfo from '../components/chatting/groupInfo/viewUserInfo'
import removeUser from '../components/menu/removeUser'
const MainNavigator = createStackNavigator({

  Menu: {
    screen: MenuScreen,
    navigationOptions: {
      title: 'Menu',
      header: null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },

  viewgroupInfo: {
    screen: viewgroupInfo,
    navigationOptions: {
      title: 'viewgroupInfo',
      header: null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },

  Rating: {
    screen: ratting,
    navigationOptions: {
      title: 'Đánh giá app',
      //header:null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },

  Addmember: {
    screen: Addmember,
    navigationOptions: {
      title: 'Addmember',
      header: null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },


  NewChatting: {
    screen: NewChatting,
    navigationOptions: {
      title: 'Chat',
      header: null,
      headerTintColor: colors.gray,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },

  Group: {
    screen: group,
    navigationOptions: {
      title: 'Chatting',
      //header:null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },


  CreateGroup: {
    screen: CreateGroup,
    navigationOptions: {
      title: 'Create group',
      //header:null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },
  chat: {
    screen: chat,
    navigationOptions: {
      title: 'Chatting',
      //header:null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },


  viewTree: {
    screen: viewTree,
    navigationOptions: {
      title: 'viewTree',
      header: null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },

  removeUser: {
    screen: removeUser,
    navigationOptions: {
      title: 'viewTree',
      header: null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },


  viewUserInfo: {
    screen: viewUserInfo,
    navigationOptions: {
      title: 'viewTree',
      header: null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },


  viewGroup: {
    screen: viewGroup,
    navigationOptions: {
      title: 'viewTree',
      header: null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },

  viewDirectPathInfo: {
    screen: viewDirectPathInfo,
    navigationOptions: {
      title: 'viewDirectPathInfo',
      header: null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },


  listFriend: {
    screen: listFriend,
    navigationOptions: {
      title: 'Chatting',
      //header:null,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        height: APPBAR_HEIGHT,
      },
      headerTitleStyle: {
      },
    }
  },
});





const tabNavigator = createAppContainer(
  MainNavigator
);
export default tabNavigator;
