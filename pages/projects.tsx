/* eslint-disable @next/next/no-img-element */
import { useState, useCallback, useReducer, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";
import {
  Label,
  TextInput,
  Button,
  Dropdown,
  Card,
  Tabs,
  Table,
  Checkbox,
  Badge,
  Avatar,
  Modal,
  Textarea,
  Spinner,
} from "flowbite-react";
import Link from "next/link";
import { HiClock, HiOutlineFilter } from "react-icons/hi";
import Skeleton from "../components/skeleton";
import { ProjectProp, Todo } from "../utils";
import React from "react";
import useSWR from "swr";
import { Formik } from "formik";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import ProjectList from "../components/projects/list";
import { useRouter } from "next/router";
import { GoCalendar } from "react-icons/go";
import TodoList from "../components/projects/list";
import AddNewTodo from "../components/projects/add-project";
import Head from "next/head";

const dragReducer = (state, action) => {
  return state;
};

const Projects = () => {
  const [createProjectModal, setCreateProjectModal] = React.useState(false);
  const [, setShowModal] = React.useState(false);
  const [projects, setProjects] = React.useState<Array<ProjectProp>>();
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [inprogressTodos, setInProgressTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const addItemHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };
  console.log(todo);
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let inprogress = inprogressTodos;
    let complete = CompletedTodos;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "TodosInProgress") {
      add = inprogress[source.index];
      inprogress.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "TodosInProgress") {
      inprogress.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setInProgressTodos(inprogress);
    setCompletedTodos(complete);
    setTodos(active);
  };

  const user_id =
    typeof window !== "undefined" && sessionStorage.getItem("user_id");
  const assigned =
    typeof window !== "undefined" && sessionStorage.getItem("loggedIn");

  useEffect(() => {
    (async function getProjects() {
      let { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user_id);
      if (error) toast.error("Error loading");
      else setProjects(projects);
    })();
  }, [projects, user_id]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section>
        <AddNewTodo onAddItem={addItemHandler} todo={todo} setTodo={setTodo} />
        <div className=" px-4 md:min-h-[100vh] w-full overflow-auto">
          <TodoList
            todos={todos}
            setTodos={setTodos}
            CompletedTodos={CompletedTodos}
            setCompletedTodos={setCompletedTodos}
            inProgressTodos={inprogressTodos}
            setInProgressTodos={setInProgressTodos}
          />
        </div>
      </section>
    </DragDropContext>
  );
};

export default Projects;
