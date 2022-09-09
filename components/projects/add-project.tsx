import { Button } from "flowbite-react";
import React, { HtmlHTMLAttributes, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface IAddItem {
  onAddItem: (e: React.FormEvent) => void;
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}
const AddNewTodo: React.FC<IAddItem> = ({ todo, setTodo, onAddItem }) => {
  const textRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        onAddItem(e);
        if (textRef.current) {
          textRef.current.value = "";
        }
      }}
    >
      <div className="flex justify-between bg-white dark:bg-gray-800 rounded-lg p-4 min-h-[2rem] m-4">
        <input
          type="text"
          defaultValue={todo}
          id="todo"
          name="todo"
          placeholder="Add new project"
          className="w-full rounded-md border-gray m-2 px-4 bg-transparent text-white focus-within:outline-none focus-visible:outline-none focus-within:bg-transparent"
          onChange={(e) => setTodo(e.target.value)}
          ref={textRef}
        />
        <div className="m-auto">
        <Button type="submit">
          {" "}
          <AiOutlinePlus />{" "}
        </Button>
        </div>
      </div>
    </form>
  );
};

export default AddNewTodo;
