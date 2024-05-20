import { useStore } from '@nanostores/solid';
import { Show } from 'solid-js';

import { user } from '#src/store/users';

export default function Username() {
  const storedUser = useStore(user);

  return (
    <Show when={storedUser().username}>
      <div class="hidden text-sm font-semibold md:block">
        {storedUser().username}
      </div>
    </Show>
  );
}
