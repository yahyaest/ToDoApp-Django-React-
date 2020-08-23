import React, { useState, useEffect } from "react";
import "../css/mainPage.css";

const MainPage = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  function fetchData() {
    const url = "http://127.0.0.1:8000/api/task/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setTasks(data);
      })
      .catch((err) => alert(err));
  }

  const handleUpdate = (task) => {
    let csrftoken = getCookie('csrftoken')
    console.log(task);
    const title = document.getElementById("task__input").value;
    fetch(`http://127.0.0.1:8000/api/task/${task.id}/`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        'X-CSRFToken':csrftoken,
      },
      body: JSON.stringify({ title: `${title}` }),
    }).then((response) => fetchData());
  };

  const handleDelete = (task) => {
    let csrftoken = getCookie('csrftoken')
    console.log(task);
    fetch(`http://127.0.0.1:8000/api/task/${task.id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        'X-CSRFToken':csrftoken,
      },
    }).then((response) => fetchData());
  };

  const handleCreate = (e) => {
    let csrftoken = getCookie('csrftoken')
    e.preventDefault();
    console.log(e);
    const title = document.getElementById("task__input").value;
    fetch(`http://127.0.0.1:8000/api/task/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'X-CSRFToken':csrftoken,
      },
      body: JSON.stringify({ title: `${title}` }),
    }).then((response) => fetchData());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const input = document.getElementById("task__input").value;
    let searchResult = tasks.filter((task) =>
      input !== ""
        ? task.title.toLowerCase().indexOf(input.toLowerCase()) > -1
        : null
    );
    setSearch(searchResult);
    setShow(true);
  };

  //console.log(tasks);

  return (
    <div>
      <h1>Main Page</h1>
      <div className="task__list">
        <form action="">
          <input type="text" className="form-control" id="task__input" />
          <button
            onClick={(e) => handleCreate(e)}
            type="submit"
            className="btn btn-info"
          >
            Add Task
          </button>
          <button onClick={(e) => handleSearch(e)} className="btn btn-warning">
            Search
          </button>
        </form>
        <table className="task__table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Task</th>
              <th>Created At</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="tasks">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.created_at}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(task)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(task)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {show ? (
          search.length > 0 ? (
            <div className="task__search">
              <h2>Search Result</h2>
              <ul>
                {search.map((query) => (
                  <li key={query.id}>{query.title}</li>
                ))}
              </ul>
            </div>
          ) : (
            <h3>No Result Found. Please Try Again.</h3>
          )
        ) : null}
      </div>
    </div>
  );
};

export default MainPage;
