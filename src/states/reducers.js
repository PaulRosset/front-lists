import { NEWENTRY, DELETENTRY, SHOW, UNSHOW } from "./types";

export const NewTodo = (state = [], actions) => {
  switch (actions.type) {
    case NEWENTRY:
      return [...state, { id: actions.payload }];
    case DELETENTRY:
      return state.filter(entry => entry.id !== actions.payload);
    default:
      return state;
  }
};

export const TodoTools = (state = {}, actions) => {
  switch (actions.type) {
    case SHOW:
      return actions.payload;
    case UNSHOW:
      return {
        id: "",
        idRoom: actions.payload
      };
    default:
      return state;
  }
};
