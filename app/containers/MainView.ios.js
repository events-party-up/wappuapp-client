'use strict';

import React, { Component } from 'react';
import { TabBarIOS, View } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import CalendarView from './CalendarView';
import EventMapView from './EventMapView';
import CompetitionView from './CompetitionNavigator';
import FeedView from './FeedView';
import SettingsView from './ProfileView';
import Tabs from '../constants/Tabs';
import * as NavigationActions from '../actions/navigation';
import RegistrationView from '../components/registration/RegistrationView';
import errorAlert from '../utils/error-alert';
import MDIcon from 'react-native-vector-icons/MaterialIcons';

const theme = require('../style/theme');

class MainView extends Component {
  onChangeTab(tab) {
    this.props.dispatch(NavigationActions.changeTab(tab));
  }

  render() {
    const immutableError = this.props.errors.get('error');
    if (immutableError) {
      const error = immutableError.toJS();
      errorAlert(this.props.dispatch, _.get(error, 'header'), _.get(error, 'message'));
    }

    return (
      <View style={{flex:1}}>
        <TabBarIOS tintColor={theme.secondary} translucent={true} >
          <MDIcon.TabBarItemIOS
            iconName='access-time'
            title='Events'
            selected={this.props.currentTab === Tabs.CALENDAR}
            onPress={() => { this.onChangeTab(Tabs.CALENDAR); }}>
            <CalendarView />
          </MDIcon.TabBarItemIOS>

          <MDIcon.TabBarItemIOS
            iconName='location-on'
            title='Map'
            selected={this.props.currentTab === Tabs.MAP}
            onPress={() => { this.onChangeTab(Tabs.MAP); }}>
            <EventMapView />
          </MDIcon.TabBarItemIOS>

          <MDIcon.TabBarItemIOS
            iconName='whatshot'
            title='Buzz'
            selected={this.props.currentTab === Tabs.FEED}
            onPress={() => { this.onChangeTab(Tabs.FEED); }}>
            <FeedView />
          </MDIcon.TabBarItemIOS>

          <MDIcon.TabBarItemIOS
            iconName='equalizer'
            title='Ranking'
            selected={this.props.currentTab === Tabs.ACTION}
            onPress={() => { this.onChangeTab(Tabs.ACTION); }}>
            <CompetitionView />
          </MDIcon.TabBarItemIOS>

          <MDIcon.TabBarItemIOS
            iconName='person-outline'
            title='Settings'
            selected={this.props.currentTab === Tabs.SETTINGS}
            onPress={() => { this.onChangeTab(Tabs.SETTINGS); }}>
            <SettingsView />
          </MDIcon.TabBarItemIOS>
        </TabBarIOS>

        <RegistrationView />
      </View>
    )
  }
}

const select = store => {
  return {
    currentTab: store.navigation.get('currentTab'),
    errors: store.errors
  }
};

export default connect(select)(MainView);
