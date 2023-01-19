import {useState} from "react";

const toDoList = [
    { id: 1, title: "Shopping", finished: false },
    { id: 2, title: "Do homework", finished: false },
    { id: 3, title: "Relax", finished: false },
];

const Todo = () => {
    const [list, setList] = useState(toDoList);
    const [updatedItem, setUpdatedItem] = useState(null);

    return (
        <div>
            <h3>My todos:</h3>
            <div>
                {list.map((item, idx) => (
                    <ListItem key={item.id} item={item} idx={idx} setList={setList} updatedItem={updatedItem} setUpdatedItem={setUpdatedItem}
                    />
                ))}
            </div>
        </div>
    );
};

const ListItem = ({item: { id, title }, idx, setList, updatedItem, setUpdatedItem,}) => {
    const isCurrentBeingUpdated = updatedItem === id;

    const handleInputChange = ({ target: { value } }) => {
        setList((prevList) =>
            prevList.map((item) =>
                item.id === id ? { ...item, title: value } : item
            )
        );
    };


    const renderTitleOrInput = () => {
        return isCurrentBeingUpdated ? (
            <input value={title} onChange={handleInputChange} />
        ) : (
            title
        );
    };

    return (
        <div style={{ border: "1px solid navy", margin: "1rem", padding: "1rem" }}>
            <div>
                {idx + 1}. {renderTitleOrInput()}
            </div>
            <button onClick={() => setUpdatedItem(isCurrentBeingUpdated ? null : id)}>
                {isCurrentBeingUpdated ? "Save" : "Edit"}
            </button>
        </div>
    );
};
export default Todo