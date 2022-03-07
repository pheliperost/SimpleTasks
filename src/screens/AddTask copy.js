import React, {Component} from 'react'
import { Modal,View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity,TextInput, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import {Picker} from '@react-native-picker/picker';
import {styles} from '../screens/AddTask/styles';
import commonStyles from '../screens/AddTask/commonStyles';

import { server, showError } from '../common'
import axios from 'axios'

const initialState = { 
        desc: '', 
        date: new Date(), 
        showDatePicker: false, 
        eventtype: '', 
        studentsDropDown: '',
        startedAt:'',
        endedAt:'',
        Obs: 'teste',
        eventType: '',
        student: '',
        evtSelected: '',
        studentselected: ''

    }

const today = moment();
const datetimeNow = today.format('YYYY-MM-DD HH:MM:SS')

export default class AddEvent extends Component{

    state = {
        ...initialState

    }

    componentDidMount = async () =>{
        
       this.loadEventTypeItems()
       this.loadStudentsItems()
    }

    save = () =>{
        const newEvent = {
            date: this.state.date,
            startedAt: this.state.date,
            endedAt: this.state.date,
            eventType: this.state.evtSelected,
            Obs: 'teste',            
            student: this.state.studentselected

        }
      
        if(this.state.evtSelected == "" || this.state.evtSelected == 0){
            alert("You need to select an event type first")
        }else{
            if(this.state.studentselected == "" || this.state.studentselected == 0){
                alert("You need to select an student first")
            }else{                
                  this.props.onSave && this.props.onSave(newEvent)
                  
            }
        }

        //this.setState({...initialState})
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker 
            value={this.state.date}
            onChange={(_,date)=>this.setState({date, showDatePicker: false})}
            mode='date'/>
            
            const dateString =  moment(this.state.date).format('dddd. D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() =>  this.setState({showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

            return datePicker
    }

    getEventTypePicker = () =>{
        let eventTypePicker = 
        <Picker
            style={{ width: "100%" }}
            mode="dropdown"
            selectedValue={this.state.evtSelected}                        
            onValueChange={(itemValue, itemIndex) =>
                this.setState({
                    evtSelected: itemValue
                })      
            }
        >
            <Picker.Item label='Please select an event type' value='0' />

            {this.state.eventtype !== "" ? (
                this.state.eventtype.map(evt => {
                    return <Picker.Item label={evt.type} value={evt.id} key={evt.id} />;
                })
            ) : (
                <Picker.Item label="Loading..." value="0" />
            )}
        </Picker>

        return eventTypePicker

    }


    getStudentPicker = () =>{
        let studentPicker = 
                        <Picker
                            style={{ width: "100%" }}
                            mode="dropdown"
                            selectedValue={this.state.studentselected}                        
                            onValueChange={(itemValue1, itemIndex1) =>
                                this.setState({
                                    studentselected: itemValue1
                                })
                            }
                        >
                            <Picker.Item label='Please select an student' value='0' />

                            {this.state.studentsDropDown !== "" ? (
                                this.state.studentsDropDown.map(std => {
                                    return <Picker.Item label={std.name} value={std.id} key={std.id} />;
                                })
                            ) : (
                                <Picker.Item label="Loading..." value="0" />
                            )}
                        </Picker>   

        return studentPicker

    }

    loadEventTypeItems = async () => {
        try{
            const res = await axios.get(`${server}/eventtype`)          
            this.setState({eventtype: res.data})            
        }catch(e){
            showError(e)
        }
    }

    loadStudentsItems = async () => {
        try{
            
            const res = await axios.get(`${server}/students`)
            this.setState({studentsDropDown: res.data})            
        }catch(e){
            showError(e)
        }        
    }

    render(){
        return(
            

            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={commonStyles.today}>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={styles.header}>Novo Evento</Text>

                    {this.getDatePicker()}
                    {this.getEventTypePicker()}
                    {this.getStudentPicker()}
                
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

}
