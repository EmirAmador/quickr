import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Appbar, Button, FAB, Title } from "react-native-paper";
import { Context as AuthContext } from "../../providers/AuthContext";
import { Context as NoteContext } from "../../providers/NoteContext";
import NoteList from "../shared/NoteList";
import Toast from "react-native-toast-message";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';


const Home = ({ navigation }) => {
  const { state, signout } = useContext(AuthContext);
  const { state: noteState, getNotes, clearMessage } = useContext(NoteContext);

  useEffect(() => {
    getNotes(state.user.id);
  }, []);

  useEffect(() => {
    if (noteState.errorMessage) {
      Toast.show({
        text2: noteState.errorMessage,
      });
      clearMessage();
    }
  }, [noteState.errorMessage]);

 
const Categorias = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Personal',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Work',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Ideas',
  },

  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'List',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const categorias = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}



  return (
    <>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View style={styles.container}>
        <Title style={styles.title}>Quickr</Title>
        <Appbar style={styles.appbar}>
          <Appbar.Action
            icon="logout"
            onPress={() => {
              signout();
            }}
          />
        </Appbar>
        <NoteList notes={noteState.notes} navigation={navigation} />
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          navigation.navigate("CreateNote"), navigation.navigate("ModifyNote.js"), navigation.navigate("Home.js");
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    padding: 20,
  },
  appbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 15,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default Home;
