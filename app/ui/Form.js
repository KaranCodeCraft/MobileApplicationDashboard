"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/app/actions/auth";

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">Name</label>
        <input id="name" name="name" placeholder="John Doe" className="border border-gray-300 p-2 rounded-md" />
      </div>
      {state?.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email</label>
        <input id="email" name="email" placeholder="john@example.com" className="border border-gray-300 p-2 rounded-md" />
      </div>
      {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">Password</label>
        <input id="password" name="password" type="password" className="border border-gray-300 p-2 rounded-md" />
      </div>
      {state?.errors?.password && (
        <div className="text-red-500 text-sm">
          <p>Password must:</p>
          <ul className="list-disc list-inside">
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md ${pending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
    >
      Sign Up
    </button>
  );
}