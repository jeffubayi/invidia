import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../../utils/index";
import { Draggable } from "react-beautiful-dnd";
import {
  Card,
  Badge,
  Modal,
  Button,
  Checkbox,
  Label,
  Textarea,
  Avatar,
} from "flowbite-react";
import { HiClock, HiXCircle } from "react-icons/hi";

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const [showModal, setShowModal] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <Card
            onClick={() => setShowModal(true)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <a href="#">
              <h1 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                {todo.todo}
              </h1>
            </a>
            <div className="flex items-center justify-between">
              <Avatar
                size="xs"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
              >
                <div className="space-y-1 font-small dark:text-white">
                  <div className="text-xs">Jese Leos</div>
                </div>
              </Avatar>
              <Badge color="pink">Work</Badge>
            </div>
          </Card>
        )}
      </Draggable>
      <Modal show={showModal} size="3xl" onClose={() => setShowModal(false)}>
      <Modal.Header>{`#${todo.id}`}</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => handleEdit(e, todo.id)}
            className="space-y-6 p-6"
          >
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <Avatar
                        size="xs"
                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        rounded={true}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        jess joe
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <Badge color="info"> created</Badge>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className=" block">
              <Label htmlFor="content" value="Description" />
            </div>
            <Textarea
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              rows={4}
            />
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" checked={!todo.isDone} onClick={() => handleDone(todo.id)} />
                <Label htmlFor="remember">Completed</Label>
              </div>
              <Badge color="gray" icon={HiClock}>
                11/9/2020
              </Badge>
            </div>
            <div className="inline-flex">
              <HiXCircle
                className="text-gray-500 hover:text-red-500"
                onClick={() => handleDelete(todo.id)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              } else if (edit) {
                setEdit(false);
              }
            }}
          >
            Update project
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SingleTodo;
