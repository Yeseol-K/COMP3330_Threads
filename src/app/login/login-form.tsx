"use client";

export default function LoginForm() {
  const { formState, handleSubmit, handleReset } = useForm({
    username: "",
    password: "",
  });
  return <form onSubmit={handleSubmit} className="flex flex-col space-y-4"></form>;
}
function useForm(props: { username: string; password: string }): { formState: any; handleSubmit: any; handleReset: any } {
  throw new Error("Function not implemented.");
}
