import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from "react-native";
import uuid from 'react-native-uuid'
import Task from "./src/components/Task";
import DateTimePicker from '@react-native-community/datetimepicker'

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [text, setText] = useState('Empty')

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const onChange = (event, selectedDate) =>
  {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = '\n' + tempDate.getDate() + ' - ' + tempDate.getMonth() + ' - ' + tempDate.getFullYear()
    let fTime = '\n' + tempDate.getHours() + ' : ' + tempDate.getMinutes()
    setText(fDate + 'at' + fTime)
  }

  const addToList = () => {
    if (inputValue === "") {
      Alert.alert("Oops", "Input is empty", [
        {
          text: "Ok",
        },
      ]);
      return;
    }

    const newItem = {
      id: uuid.v4(),
      item: inputValue,
      datenTime: text
    };
    setTasks([newItem, ...tasks]);
    setInputValue("");
    Keyboard.dismiss();
  };

  const del = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };


  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <View>
          <Text style={styles.sectionTitle}>Today's tasks 🛠</Text>
        </View>
        <View>
        <TextInput
          value={inputValue}
          style={styles.input}
          placeholder='What are you upto?'
          onChangeText={(text) => setInputValue(text)}
        />
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => showMode('date')}>
            <MaterialIcons 
              style={{justifyContent: "center", color: "black", padding: 10, marginLeft: 125}}
              name = "date-range"
              size = {35}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => showMode('time')}>
            <MaterialIcons
              style ={{justifyContent: "center", color: "black", padding: 10}}
              name = "timer"
              size = {35}
            />
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID = 'dateTimePicker'
            value = {date}
            mode = {mode}
            is24Hour = {true}
            display = 'default'
            onChange = {onChange}
          />
        )}
        </View>
        <TouchableOpacity onPress={addToList}>
          <View style={styles.opa}>
            <Text style={{ color: "white" }}>Add To List</Text>

            <MaterialIcons
              style={{ marginLeft: 5, color: "white" }}
              name='add-box'
              size={24}
              color='black'
            />
          </View>
        </TouchableOpacity>

        <View style={styles.items}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={tasks}
            renderItem={({ item }) => (
              <Task task={item} del={del} />
            )}
          />
        </View>
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "silver",
  },
  opa: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "red",
  },
  taskWrapper: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 90
  },
  items: {
    flex: 1,
    marginTop: 30,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});