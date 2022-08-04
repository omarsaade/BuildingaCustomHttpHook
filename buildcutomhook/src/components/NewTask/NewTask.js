import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  // console.log("1");
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };



  const enterTaskHandler = (taskText) => {


    sendTaskRequest(
      {
        url: 'https://react-13734-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)


      // (taskData) => createTask(taskText, taskData)
    );

  };


  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;






// This line ...



// createTask.bind(null, taskText)


// ... is equivalent to this anonymous function, which might be easier to understand:



// (taskData) => createTask(taskText, taskData)


// The bind syntax might look strange, but it's defined in the way how Max explains it.

