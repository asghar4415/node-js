import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BASE_URL } from "./config";

//first run the server 
//then run the react app
//then check the output


function App() {
  const [inputValue, setInputValue] = useState("");

  const addTodoHandler = async () => {
    try {
      console.log("addTodoHandler");
      const obj = {
        value: inputValue,
        userID: "101",
      };
      const create = await axios.post(`${BASE_URL}/createpost`, obj);
      console.log("create", create);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const [post, setPost] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const editHandler = async (id) => {
    try {
      const userValue = prompt("enter value");
      const obj = {
        value: userValue,
      };

      const url = `${BASE_URL}/updatepost/${id}`;
      const updatePost = await axios.put(url, obj);
      fetchData();
      console.log("getPost", updatePost);

    } catch (error) {
      console.log("error", error.message);
    }
  };

  const fetchData = async () => {
    try {
      const getPost = await axios.get(`${BASE_URL}/getpost`);
      console.log("getPost", getPost.data.data);
      setPost(getPost.data.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const url = `${BASE_URL}/deletepost/${id}`;
      await axios.delete(url);
      fetchData();
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="enter value"
      />
      <button onClick={addTodoHandler}>ADD TODO</button>

      {post?.map((post) => {
        return (
          <div key={post._id}>
            <p> {post.value}</p>
            <button onClick={() => editHandler(post._id)}>EDIT</button>
            <button onClick={() => deleteHandler(post._id)}>DELETE</button>
          </div>
        );
      })}
    </>
  );
}

export default App;