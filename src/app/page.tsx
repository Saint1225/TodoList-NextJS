import prisma from "@/db";
import { TodoItemType } from "@/type";
import Link from "next/link";
import TodoItem from "@/components/TodoItem";

const getTodo = () => {
  return prisma.todo.findMany();
};

async function toggleTodoHandler(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  // await prisma.todo.create({ data: { complete: false, title: "test" } });
  // await prisma.todo.deleteMany({ where: { complete: false } });
  const todos = await getTodo();
  return (
    <>
      <header className="flex justify-between items-center mb-4 text-2xl">
        <h1>Todos</h1>
        <Link
          href={"/new"}
          className=" border-solid border-2 border-slate-300 hover:bg-slate-700 focus-within:bg-slate-700 p-3 rounded-xl outline-none"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodoHandler} />
        ))}
      </ul>
    </>
  );
}
