import { NEWENTRY, DELETENTRY, SHOW, UNSHOW } from "./types";
import shortid from "shortid";

export function newEntry() {
  return {
    type: NEWENTRY,
    payload: shortid.generate()
  };
}

export function deleteEntry(id) {
  return {
    type: DELETENTRY,
    payload: id
  };
}

export function getTodoToShow(todo) {
  return {
    type: SHOW,
    payload: todo
  };
}

export function unShowTodoToShow(idRoom) {
  return {
    type: UNSHOW,
    payload: idRoom
  };
}
