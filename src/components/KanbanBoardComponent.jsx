import { DndContext, rectIntersection } from '@dnd-kit/core';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import KanbanColumnComponent from './KanbanColumnComponent';
import AddCardComponent from './AddCardComponent';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const KanbanBoardComponent = ({ data }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(data);
    console.log(data);
  }, [data]);

  const columns = [
    {
      title: 'Backlog',
      items: tasks.filter((val) => val.status === 'backlog'),
      color: 'gray',
    },
    {
      title: 'Todo',
      items: tasks.filter((val) => val.status === 'todo'),
      color: 'blue',
    },
    {
      title: 'InProgress',
      items: tasks.filter((val) => val.status === 'inprogress'),
      color: 'yellow',
    },
    {
      title: 'InReview',
      items: tasks.filter((val) => val.status === 'inreview'),
      color: 'orange',
    },
    {
      title: 'Done',
      items: tasks.filter((val) => val.status === 'done'),
      color: 'green',
    },
  ];

  const addNewCard = (title) => {
    const status = 'backlog';
    setTasks([...tasks, { title, status }]);

    axios
      .post(`${API_BASE_URL}/add-task`, {
        title,
        status,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const updateStatus = (arrayCopy, title, status) => {
    // find the index of object from array that you want to update
    const objIndex = arrayCopy.findIndex((obj) => obj.title === title);

    // make new object of updated object.
    const updatedObj = { ...arrayCopy[objIndex], status };

    // final new array of objects by combining updated object.
    const updatedTasks = [
      ...arrayCopy.slice(0, objIndex),
      updatedObj,
      ...arrayCopy.slice(objIndex + 1),
    ];

    axios
      .put(`${API_BASE_URL}/tasks/${title}`, {
        status,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    setTasks(updatedTasks);
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        const container = e.over?.id;
        const title = e.active.data.current?.title || '';
        updateStatus(tasks, title, container.toLowerCase());
      }}
    >
      <Flex flexDirection="column">
        <AddCardComponent addCard={addNewCard} />
        <SimpleGrid columns={[1, null, 5]}>
          {columns.map(({ title, items, color }, index) => (
            <KanbanColumnComponent key={index} title={title} items={items} color={color} />
          ))}
        </SimpleGrid>
      </Flex>
    </DndContext>
  );
};

export default KanbanBoardComponent;
