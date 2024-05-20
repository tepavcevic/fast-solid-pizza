import Button from '#src/components/button';
import { removeFromCart } from '#src/store/cart';

export default function DeleteItem(props: { id: number }) {
  const handleDeleteItem = () => removeFromCart(props.id);

  return (
    <Button variant="small" onClick={handleDeleteItem}>
      Delete
    </Button>
  );
}
