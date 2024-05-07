import LinkButton from '../../components/link-button';

function EmptyCart() {
  return (
    <div class="py-4 px-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p class="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
