import firebase from "firebase/app";
import "firebase/database";
import shortid from "shortid";
import moment from "moment";

export const app = firebase.initializeApp({});

export function writeRoomData(name, publicy, cb) {
  const id = shortid.generate();
  return app
    .database()
    .ref(`rooms/${id}`)
    .set(
      {
        name,
        publicy,
        id,
        timeCreation: moment().format()
      },
      err => {
        if (err) {
          return cb(err, null);
        } else {
          return cb(null, `Succesfully created your ${name} room.`);
        }
      }
    );
}

export function updateRoomData(idRoom, fieldToUpdate, data, cb) {
  const updates = {};
  updates[`rooms/${idRoom}/${fieldToUpdate}`] = data;
  return app
    .database()
    .ref()
    .update(updates, err => {
      if (err) return cb(err, null);
      else return cb(null, `Update on ${fieldToUpdate} sucessfully performed`);
    });
}

export function multiUpdateRoom(updates, cb) {
  return app
    .database()
    .ref()
    .update(updates, err => {
      if (err) return cb(err);
      else return cb(null);
    });
}

export function deleteField(field, cb) {
  return app
    .database()
    .ref(field)
    .remove(err => {
      if (err) return cb(err, null);
      else return cb(null, "Succesfully deleted entry!");
    });
}
