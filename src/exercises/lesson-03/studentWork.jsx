//Lesson-03 Component Lifecycle, Hooks, State, and Props
//Exercise: React Bug Hunt – Fix the broken components in this folder
//Impport components here
import BugEffectLoop from './BugEffectLoop';
import BugStateUpdate from './BugMutatedState';
import BugPropChange from './BugProps';

export default function StudentWork() {
  return (
    <div>
      {/* add components here */}
      <BugEffectLoop />
      <BugStateUpdate />
      <BugPropChange />
      <p>Student output will go here</p>
    </div>
  );
}
