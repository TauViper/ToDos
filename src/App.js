// import logo from './logo.svg';
import "./App.css";
import {  useRef, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [todo, setTodo] = useState("");
  // TODO переделать на объекты
  const [exercise, setExercise] = useState([]);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef(null);

  const addItem = () => {
    if (todo) {
      exercise.push({
        id: nanoid(),
        value: todo,
        completed: false,
      });

      setExercise([...exercise]);
      setTodo("");
    }
    setTodo('')


  };
  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      addItem();
    }
  };
  const editItem = () => {
    if (editValue) {
      const editExercise = exercise.map((item) =>
        item.id === editValue ? { ...item, value: todo } : item
      );

      setExercise(editExercise);
      setTodo("");
      setEditValue("");
    }
  };
  const editHandleClick = (item) => {
    setTodo(item.value);
    setEditValue(item.id);
    inputRef.current.focus();
  };
  const toggle = (id) => {
    setExercise([
      ...exercise.map((el) =>
        el.id === id ? { ...el, completed: !el.completed } : { ...el }
      ),
    ]);
  };
  return (
    <div className="App">
      <h1>Список задач {exercise.length}</h1>
      <header className="App-header">
               <input
          ref={inputRef}
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
           // TODO обернуть в тег form
          onKeyDown={pressEnter}
        />

        {editValue && <button onClick={editItem}>Save</button>}
        {!editValue && <button onClick={addItem}>Add exercise</button>}
      </header>
      <div>
        <ul>
          {exercise.map((item) => (
            <li className="Item__Todo" key={item.id}>
              <div
                onClick={() => toggle(item.id)}
                className={item.completed ? "Item__Li_done" : "Item__Li"}
                key={item.id}
              >
                {item.value}
              </div>
              <button onClick={() => editHandleClick(item)}>Edit</button>
                 {/*TODO реализовать удаление */}
              {/*<button onClick={() => removeItem(item.id)}>X</button>*/}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
