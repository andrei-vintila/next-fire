import { googleAuthProvider } from "../lib/firebase";

export default function EnterPage({}) {
  return (
    <main>
      {user ?
        !username ? <UsernameForm />
        :}
    </main>
  );
}

function SignInButton() {
 googleAuthProvider
}

function SignOutButton() { }

function UsernameForm() {}