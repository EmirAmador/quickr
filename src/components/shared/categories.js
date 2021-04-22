import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Caption, IconButton, TextInput } from "react-native-paper";
import { format } from "date-fns";
import theme from "../../theme";
import { Context as NoteContext } from "../../providers/NoteContext";
import { Context as AuthContext } from "../../providers/AuthContext";

function CategoriasList(props) {
  const cate = props.cate;
  const listCategories = cate.map((categor) =>
    <li>{categor}</li>
  );
  return (
    <ul>{listCategories}</ul>
  );
}

const cate = [Personal, Work, Ideas, List];
ReactDOM.render(
  <CategoriasList numbers={cate} />,
  document.getElementById('root')
);