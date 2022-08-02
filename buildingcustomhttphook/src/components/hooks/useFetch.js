import React, { useEffect, useState } from 'react'

function useFetch(method) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);


    const f = async (taskText) => {
        // console.log(taskText);
        setIsLoading(true);
        setError(null);
        try {

            if (method === "GET") {
                console.log("get");
                const response = await fetch('https://react-http-38b54-default-rtdb.firebaseio.com/tasks.json');
                if (!response.ok) {
                    throw new Error('Request failed!');
                }
                const data = await response.json();
                const loadedTasks = [];

                for (const taskKey in data) {
                    loadedTasks.push({ id: taskKey, text: data[taskKey].text });
                }
                setTasks(loadedTasks);

            } else {
                console.log("post");
                const response = await fetch(
                    'https://react-http-38b54-default-rtdb.firebaseio.com/tasks.json',
                    {
                        method: 'POST',
                        body: JSON.stringify({ text: taskText }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Request failed!');
                }

                const data = await response.json();
                const generatedId = data.name;
                const createdTask = { id: generatedId, text: taskText };

                // props.onAddTask(createdTask);


            }


        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };




    return [tasks, isLoading, error, f, setTasks];
}

export default useFetch

