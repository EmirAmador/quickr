import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Caption, IconButton, TextInput } from "react-native-paper";
import { format } from "date-fns";
import theme from "../../theme";
import { Context as NoteContext } from "../../providers/NoteContext";
import { Context as AuthContext } from "../../providers/AuthContext";
import RNPickerSelect from "react-native-picker-select";


const CreateNote = ({ navigation }) => {
  const { createNote } = useContext(NoteContext);
  const { state } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());
  const [content, setContent] = useState("");

  const handleSaveNote = () => {
    if (!title) {
      setTitle("New note");
      createNote("New note", content, timestamp, state.user.id);
      categoriaslist("Escoga Categoria");
    } else createNote(title, content, timestamp, state.user.id);

    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconBar}>
        <IconButton
          icon="close-circle-outline"
          color={theme.colors.primary}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <IconButton
          icon="check-circle-outline"
          color={theme.colors.primary}
          onPress={handleSaveNote}
        />
      </View>
      <TextInput
        mode="flat"
        placeholder="Title"
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
      />
      <Caption>{`${format(timestamp, "eee H:m")}, | ${
        content.length
      } characters`}</Caption>
      <TextInput
        multiline
        style={styles.contentInput}
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
      />
      <View style={styles.selector}>
             <Text>Seleccione Categoria</Text>
             <RNPickerSelect
                 onValueChange={(value) => console.log(value)}
                 items={[
                     { label: "Personal", value: "Personal" },
                     { label: "Work", value: "Work" },
                     { label: "Ideas", value: "Ideas" },
                     { label: "List", value: "List" },
                 ]}
             />
         </View>
    </View>

      

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.backgroundWhite,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: theme.colors.backgroundWhite,
  },
  contentInput: {
    flex: 1,
    backgroundColor: theme.colors.backgroundWhite,
    borderBottomWidth: 0,
  },
  iconBar: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  selector : {
    flex            : 1,
    backgroundColor : theme.colors.backgroundWhite,
    alignItems      : "center",
    justifyContent  : "center",
  },
});

export default CreateNote;
