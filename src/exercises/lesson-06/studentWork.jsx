import { useState } from 'react';
import UserProfile from './components/UserProfile';
import FilterButton from './components/FilterButton';
import SingleTask from './components/SingleTask';
import useDatafetchLogic from './hooks/useDatafetchLogic';
import { filterLogic } from './utils/filterLogic';

export default function StudentWork() {
  const { tasks, loading } = useDatafetchLogic();
  const [filter, setFilter] = useState('all');

  const visibleTasks = filterLogic(tasks, filter);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      <UserProfile name="Student" />

      <FilterButton filter={filter} setFilter={setFilter} />

      <ul>
        {visibleTasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
