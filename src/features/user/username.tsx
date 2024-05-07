import { useStore } from "@nanostores/solid";
import { user } from "../../store/users";
import { createEffect, createSignal } from "solid-js";

export default function Username() {
  const storedUser = useStore(user)
  const [username, setUsername] = createSignal(storedUser().username);

  if (!username()) return null;

  createEffect(() => {
    console.log('storedUser().username', storedUser().username);

    setUsername(storedUser().username)
  })

  return (
    <div class="hidden text-sm font-semibold md:block">{username()}</div>
  );
}
