import Loading from "@/components/common/Loading";
import TaskColumn from "@/components/common/TaskColumn";
import { NewTaskModal } from "@/components/common/muimodal/NewTaskModal";
import { EditTaskModal } from "@/components/common/muimodal/EditTaskModal";
import { checkDate, getColCount } from "@/helpers/Helpers";
import { Task } from "@/types/TaskInterface";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("task_id")) {
      localStorage.setItem("task_id", "0");
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("tasks") &&
      JSON.parse(localStorage.getItem("tasks")).length > 0
    ) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
      return;
    }
    // let data = localStorage.getItem("tasks");
    // if (data) setTasks(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, setTasks]);

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
    localStorage.setItem("tasks", JSON.stringify(newList));
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
        )} gap-4 sm:grid-cols-2 grid-cols-1`}
      >
        {check?.todo && (
          <TaskColumn
            color="default"
            tasks={tasks}
            type="todo"
            removeTask={removeTask}
            newColAsssign={assignTaskOtherCol}
            setTasks={setTasks}
          />
        )}
        {check?.inprog && (
          <TaskColumn
            color="warning"
            tasks={tasks}
            type="in_progress"
            removeTask={removeTask}
            newColAsssign={assignTaskOtherCol}
            setTasks={setTasks}
          />
        )}
        {check?.done && (
          <TaskColumn
            color="success"
            tasks={tasks}
            type="done"
            removeTask={removeTask}
            newColAsssign={assignTaskOtherCol}
            setTasks={setTasks}
          />
        )}
        {check?.expired && (
          <TaskColumn
            color="error"
            tasks={tasks}
            type="expired"
            removeTask={removeTask}
            newColAsssign={assignTaskOtherCol}
            setTasks={setTasks}
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
      <div className="flex justify-center">
        <NewTaskModal tasks={tasks} setTasks={setTasks} />
      </div>
      {!loading ? GenerateColumns() : <Loading />}
    </main>
  );
}
