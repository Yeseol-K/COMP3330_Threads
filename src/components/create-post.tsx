"use client";
import { useState } from "react";

export default function CreatePostForm({ user }: { user: any }) {
  const [charCount, setCharCount] = useState(0);
  const [content, setContent] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    setContent(e.target.value);
  };

  return (
    <main className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <textarea className="bg-transparent text-black rounded-lg p-4 w-full h-24 resize-none focus:outline-none" name="content" placeholder="Post a thing..." required onChange={handleTextChange} value={content} />
        <div className="flex justify-between items-center mt-2">
          <div className="text-neutral-500 text-sm">Characters: {charCount}</div>
        </div>
      </div>
    </main>
  );
}
