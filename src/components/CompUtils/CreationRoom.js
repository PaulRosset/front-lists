import React, { PureComponent } from "react";
import styled from "styled-components";
import { Message, Form, Button } from "semantic-ui-react";
import { Formik } from "formik";
import { writeRoomData } from "./../../utils/firebase";

const RoomCreateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  margin: auto;
`;

const WrapperRadio = styled.div`
  align-self: center;
  margin-left: 10px;
`;

class CreationRoom extends PureComponent {
  state = {};

  render() {
    return (
      <RoomCreateContainer>
        <Formik
          initialValues={{
            room: "",
            publicy: ""
          }}
          validate={values => {
            let errors = {};
            if (!values.room) {
              errors.room = "Provide a Room Name";
            } else if (!/^[a-zA-Z0-9-_]+$/.test(values.room)) {
              errors.room = "Only letters, numbers and (-,_) are allowed";
            } else if (!values.publicy) {
              errors.publicy = "You must provide the publicy of your room";
            }
            return errors;
          }}
          onSubmit={(
            values,
            { setSubmitting, setErrors, setStatus, resetForm }
          ) => {
            setSubmitting(true);
            writeRoomData(values.room, values.publicy, (err, res) => {
              if (err) {
                setSubmitting(false);
                setErrors({
                  room: err
                });
              } else {
                setStatus(res);
                setSubmitting(false);
                setTimeout(resetForm, 2000, { room: "", publicy: "" });
              }
            });
          }}
          render={({
            values,
            errors,
            touched,
            status,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Input
                  size="medium"
                  label="Rooms name"
                  placeholder="Room Name"
                  name="room"
                  onChange={(e, { value }) => {
                    setFieldValue("room", value);
                    setFieldTouched("room", true);
                  }}
                  value={values.room}
                />
                <WrapperRadio>
                  <label>Room publicy:</label>
                  <Form.Radio
                    label="Public"
                    value="public"
                    checked={values.publicy === "public"}
                    onChange={(e, { value }) => {
                      setFieldValue("publicy", value);
                      setFieldTouched("publicy", true);
                    }}
                  />
                  <Form.Radio
                    label="Private"
                    value="private"
                    checked={values.publicy === "private"}
                    onChange={(e, { value }) => {
                      setFieldValue("publicy", value);
                      setFieldTouched("publicy", true);
                    }}
                  />
                </WrapperRadio>
              </Form.Group>
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Submit Room!
              </Button>
              <Message
                hidden={
                  (touched.room && errors.room) || errors.publicy || status
                    ? false
                    : true
                }
                negative={
                  (touched.room && errors.room) || errors.publicy ? true : false
                }
                positive={!!status}
              >
                {touched.room && errors.room
                  ? errors.room
                  : errors.publicy
                    ? errors.publicy
                    : status}
              </Message>
            </Form>
          )}
        />
      </RoomCreateContainer>
    );
  }
}

export default CreationRoom;
