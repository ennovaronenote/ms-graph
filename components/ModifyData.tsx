import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const ModifyData = ({
  cellData,
  updateCellData,
}: {
  cellData: any;
  updateCellData: Function;
}) => {
  const [newCell, setNewCell] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (cellData !== "") setVisible(true);
    else setVisible(false);
  }, [cellData]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCell(e.target.value);
  };

  const onSubmit = () => {
    const newCellData = {
      ...cellData,
      content: newCell,
    };

    updateCellData(newCellData);
    setNewCell("");
    setVisible(false);
  };

  return visible ? (
    <div className="flex flex-col text-center w-3/4 mx-auto xl:w-1/2">
      <TextareaAutosize
        autoFocus
        placeholder="New Cell"
        className="text-center rounded-xl text-gray-600 focus:outline-none py-2 text-ellipsis my-5 xl:w-1/2 xl:mx-auto"
        onChange={onChange}
        onKeyDown={(key: any) => {
          if (key.code === "Enter" || key.code === "NumpadEnter") onSubmit();
        }}
        value={newCell}
      />
      <button
        className="bg-red-500 rounded-xl text-2xl py-2 w-1/2 mx-auto"
        onClick={onSubmit}
      >
        Edit
      </button>
    </div>
  ) : null;
};
