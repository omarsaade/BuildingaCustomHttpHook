import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {


  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  // console.log("1");


  useEffect(() => {
    const transformTasks = (tasksObj) => {
      // console.log("3");
      const loadedTasks = [];
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    // console.log("2");
    fetchTasks(
      { url: 'https://react-13734-default-rtdb.firebaseio.com/tasks.json' },
      transformTasks
    );

  }, [fetchTasks]);




  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };




  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
