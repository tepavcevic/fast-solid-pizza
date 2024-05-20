import { useStore } from '@nanostores/solid';
import { Title } from '@solidjs/meta';

import Button from '#src/components/button';
import CreateUser from '#src/features/user/create-user';
import { user } from '#src/store/users';

const Home = () => {
  const storedUser = useStore(user);

  return (
    <>
      <Title>Home | Fast Solid Pizza Co.</Title>
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
          <Button variant="primary" to="/menu">
            Continue ordering, {storedUser().username}
          </Button>
        )}
      </div>
    </>
  );
};

export default Home;
