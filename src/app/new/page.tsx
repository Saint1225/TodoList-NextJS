import prisma from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Title invalid");
  }
  await prisma.todo.create({ data: { title, complete: false } });
  redirect("/");
}

export default function Page() {
  return (
    <header className="flex justify-between mb-4 text-2xl">
      <h1 className="text-2xl">New</h1>
      <form action={createTodo} className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          className="border rounded bg-transparent border-slate-300 px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            className="border-2 border-slate-300 hover:bg-slate-700 focus-within:bg-slate-700 px-2 py-1 rounded-xl outline-none"
            href=".."
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border-2 border-slate-300 hover:bg-slate-700 focus-within:bg-slate-700 px-2 py-1 rounded-xl outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </header>
  );
}
