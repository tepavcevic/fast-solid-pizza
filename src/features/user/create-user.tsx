import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import Button from '../../components/button';
import { updateName } from '../../store/users';

function CreateUser() {
  const [username, setUsername] = createSignal('');
  const navigate = useNavigate();

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (!username()) return;
    updateName(username());
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p class="text-stone-600 mb-4 text-sm md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username()}
        onChange={(e) => setUsername(e.target.value)}
        class="input mb-8 w-72"
      />

      {username() !== '' && (
        <div>
          <Button variant="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
