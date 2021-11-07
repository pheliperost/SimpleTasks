import React, { Component, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import moment from 'moment'




    
export default class TesteCalendar extends Component{
  state = {
    items:{
      '2021-11-22': [{name: 'item 1 - any js object'}],
      '2021-11-23': [{name: 'item 2 - any js object', height: 80}],
      '2021-11-24': [],
      '2021-11-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
    }
  }

    /*
  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

   

        loadItems = (day) => {
          setTimeout(() => {
              const itemsF;
              for (let i = -15; i < 85; i++) {
              const time = day.timestamp + i * 24 * 60 * 60 * 1000;
              const strTime = timeToString(time);
              if (!itemsF[strTime]) {
                  itemsF[strTime] = [];
                  
                  const numItems = Math.floor(Math.random() * 3 + 1);
                  for (let j = 0; j < numItems; j++) {
                    itemsF[strTime].push({
                      name: 'Item for ' + strTime + ' #' + j,
                      height: Math.max(50, Math.floor(Math.random() * 150)),
                  });
                  }
              }
              }
              const newItems = {};
              Object.keys(itemsF).forEach((key) => {
              newItems[key] = itemsF[key];
              });
              this.setState({items: newItems})
          }, 1000);
        }
       
 */
        renderItem = (item) => {
         

          return (
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
              <Card>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text>{item.name}</Text>
                    <Avatar.Text label="J" />
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )
        }
        
        render(){

            return(
            <View style={{flex: 1}}>
                <Agenda
                    items={this.state.items}
                    //loadItemsForMonth={loadItems}
                    selected={'2021-11-16'}
                    renderItem={this.renderItem}
                    />            
            </View>
            )
          }
    
}

