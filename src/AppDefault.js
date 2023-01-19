// import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [todo, setTodo] = useState("");
  const [exercise, setExercise] = useState([]);
  const [saveEdit, setSaveEdit] = useState("");

  const addExercise = () => {
    if (todo) {
      exercise.push({
        id: nanoid(),
        value: todo,
        completed: false,
      });
      setExercise([...exercise]);
      setTodo("");
    }
    setTodo("");
  };
  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      saveEdit ? handleEditTodo() : addExercise();
    }
  };
  const toggle = (id) => {
    setExercise([
      ...exercise.map((el) =>
        el.id === id ? { ...el, completed: !el.completed } : { ...el }
      ),
    ]);
  };
  const removeItem = (id) => {
    const del = exercise.filter((el) => el.id !== id);
    setExercise(del);
    // console.log(id)
  };
  const editTodo = (item) => {
    setTodo(item.value);
    setSaveEdit(item.id);
  };

  const handleEditTodo = () => {
    if (saveEdit) {
      const saveExercise = exercise.map((item) =>
        item.id === saveEdit
          ? { ...item, value: todo, completed: false }
          : item
      );
      console.log(saveExercise);

      setExercise(saveExercise);
      setTodo("");
      setSaveEdit("");
    }
  };

  return (
    <div className="App">
      <h1>Список задач {exercise.length}</h1>
      <header className="App-header">
        <input
          type="text"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          onKeyDown={pressEnter}
        />

        {saveEdit ? (
          <button onClick={handleEditTodo}>Save</button>
        ) : (
          <button onClick={addExercise}>Add exercise</button>
        )}
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
              <button onClick={() => editTodo(item)}>Edit</button>
              <button onClick={() => removeItem(item.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
