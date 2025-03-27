const TaskCard = ({ task }) => (
    <div className="bg-white dark:bg-neutral-800 p-4 rounded shadow text-sm text-neutral-800 dark:text-neutral-200 cursor-move">
      {task.title}
    </div>
  )
  
  export default TaskCard
  