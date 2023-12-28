import { api } from "@/trpc/server";

export default async function Home() {
  const postIts = await api.postIt.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      <h1 className="mb-4 mt-5 text-4xl font-bold">
        Welcome to <span className="text-purple-400">SST</span> To-do List Add
        Function Demo!
      </h1>
    </main>
  );
}
