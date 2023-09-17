import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";

type EditableSpanType = {
  title: string;
  onChangeValue: (value: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanType) => {
  console.log("Editable span");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState(" ");

  const activateEditMode = () => {
    setEditMode(true);
    setValue(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChangeValue(value);
  };

  const changeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <div>
      {editMode ? (
        <TextField
          variant="outlined"
          onChange={changeEditHandler}
          value={value}
          onBlur={activateViewMode}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
      )}
    </div>
  );
});
