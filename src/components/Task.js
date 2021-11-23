import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"


const Task = ({task: {id,item,datenTime}, del }) => {
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style= {styles.square}></View>
                <Text style={styles.itemText}>{item}</Text>
                <Text style={{ color: "grey"}}>{datenTime}</Text>
            </View>
            <MaterialIcons
              onPress={() => del(id)}
              name='delete'
              size={24}
              color='red'
            />            
        </View>
    )
}

export default Task

const styles = StyleSheet.create({
    item: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    square: {
      width: 24,
      height: 24,
      backgroundColor: "#55bcf6",
      opacity: 0.4,
      borderRadius: 5,
      marginRight: 15,
    },
    itemText: {
      maxWidth: "80%",
      fontSize: 20,
      fontWeight: 'bold'
    },
    circular: {
      height: 16,
      width: 16,
      borderRadius: 50,
      borderColor: "lightblue",
      borderWidth: 2,
    },
  });