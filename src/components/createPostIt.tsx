"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreatePostIt = () => {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const router = useRouter();

  const createPost = api.postIt.create.useMutation();

  const addPostIt = async () => {
    toast.promise(
      createPost.mutateAsync({
        name: name,
        content: content,
      }),
      {
        loading: "Adding...",
        success: () => {
          router.refresh();
          return "Added!";
        },
        error: "Error!",
      },
    );
  };

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Post-It!</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Post-It!</DialogTitle>
              <DialogDescription>
                Simply give it a name and a content.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  id="name"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Textarea
                  id="content"
                  placeholder="Content"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" onClick={addPostIt}>
                  Add!
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreatePostIt;
