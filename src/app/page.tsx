import { api } from "@/trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreatePostIt from "@/components/createPostIt";

export default async function Home() {
  const postIts = await api.postIt.getAll.query();

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <div className="flex justify-center">
        <h1 className="mb-4 mt-5 text-4xl font-bold">
          Welcome to <span className="text-purple-400">SST</span> To-do List Add
          Function Demo!
        </h1>
      </div>

      <div className="mt-5 flex justify-center">
        <CreatePostIt />
      </div>

      <div className="mt-5 flex justify-center">
        {postIts.length > 0 ? (
          <div className="flex w-[1000px] flex-wrap items-start p-[8px]">
            {postIts.map((postIt) => (
              <Card key={postIt.id} className="mx-2">
                <CardHeader>
                  <CardTitle>{postIt.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{postIt.content}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-lg">
              Looks like you don't have any to-do item.
            </h1>
            <h1 className="text-lg">Create your first one!</h1>
          </div>
        )}
      </div>
    </main>
  );
}
