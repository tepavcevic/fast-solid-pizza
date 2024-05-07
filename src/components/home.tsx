import { useStore } from '@nanostores/solid';

import Button from './button';
import CreateUser from '../features/user/create-user';
import { user } from '../store/users';

const Home = () => {
  const storedUser = useStore(user);

  return (
    <div class="my-10 px-4 text-center sm:my-16">
      <h1 class="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span class="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!storedUser().username ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Continue ordering, {storedUser().username}
        </Button>
      )}
    </div>
  );
};

export default Home;
