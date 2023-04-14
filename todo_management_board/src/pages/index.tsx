import Loading from "@/components/common/Loading";
import TaskColumn from "@/components/common/TaskColumn";
import { NewTaskModal } from "@/components/common/muimodal/NewTaskModal";
import { EditTaskModal } from "@/components/common/muimodal/EditTaskModal";
import { checkDate, getColCount } from "@/helpers/Helpers";
import { Task } from "@/types/TaskInterface";
import { useEffect, useState } from "react";

export default function Home() {
  // const [tasks, setTasks] = useState<Task[]>([])
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Test title",
      description: "test desc",
      type: "todo",
      created_at: Date.now().toString(),
      updated_at: Date.now().toString(),
    },
    {
      id: 2,
      title: "Test title 2",
      description: "test desc",
      type: "in_progress",
      created_at: Date.now().toString(),
      updated_at: Date.now().toString(),
    },
    {
      id: 3,
      title: "Test title 3",
      description: "test desc",
      type: "done",
      created_at: Date.now().toString(),
      updated_at: Date.now().toString(),
    },
    {
      id: 4,
      title: "Test title 4",
      description: "test desc",
      type: "todo",
      due_date: (Date.now() - 10000).toString(),
      created_at: Date.now().toString(),
      updated_at: Date.now().toString(),
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) setTasks(JSON.parse(data));
  }, []);

  const CheckColumns = (type) => {
    let has = false;
    let tmpList = [];
    if (type === "expired") {
      tmpList = tasks?.filter((task) => checkDate(task?.due_date ?? null));
    } else {
      tmpList = tasks?.filter(
        (task) => task?.type === type && !checkDate(task?.due_date ?? null)
      );
    }

    if (tmpList[0]) {
      has = true;
    }
    if (has) return true;
    return false;
  };

  const removeTask = (task: Task) => {
    let newList = tasks?.filter((item) => item?.id !== task?.id);
    setTasks(newList);
  };

  const assignTaskOtherCol = (
    task: Task,
    newCol: "todo" | "in_progress" | "Done"
  ) => {
    setLoading(true);
    let newList = tasks;
    newList?.map((item) => {
      if (item?.id === task?.id) item.type = newCol;
    });
    setTasks(newList);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const GenerateColumns = () => {
    let check = {
      todo: CheckColumns("todo"),
      inprog: CheckColumns("in_progress"),
      done: CheckColumns("done"),
      expired: CheckColumns("expired"),
    };

    return (
      <div
        className={`grid ${getColCount(
          check
        )} gap-4 sm:grid-cols-2 grid-cols-1 grid`}
      >
        {check?.todo && (
          <TaskColumn
            color="default"
            tasks={tasks}
            type="todo"
            removeTask={removeTask}
            newColAsssign={assignTaskOtherCol}
          />
        )}
        {check?.inprog && (
          <TaskColumn
            color="warning"
            tasks={tasks}
            type="in_progress"
            removeTask={removeTask}
            newColAsssign={assignTaskOtherCol}
          />
        )}
        {check?.done && (
          <TaskColumn
            color="success"
            tasks={tasks}
            type="done"
            removeTask={removeTask}
            newColAsssign={assignTaskOtherCol}
          />
        )}
        {check?.expired && (
          <TaskColumn
            color="error"
            tasks={tasks}
            type="expired"
            removeTask={removeTask}
            newColAsssign={assignTaskOtherCol}
          />
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen justify-center px-5 py-14 mx-auto max-w-[1200px] bg-light-200 text-light-400">
      <h1 className="text-2xl font-bold text-center mx-auto pt-3 pb-5 mb-10">
        Task Management Board
      </h1>
      {!loading ? GenerateColumns() : <Loading />}
      <NewTaskModal />
      <EditTaskModal
        task={{
          id: 1,
          title: "Test title",
          description: "test desc",
          type: "todo",
          status: "open",
          created_at: Date.now().toString(),
          updated_at: Date.now().toString(),
        }}
      />
    </main>
  );
}
