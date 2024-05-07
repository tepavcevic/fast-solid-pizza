import Button from '../../components/button';
import { removeFromCart } from '../../store/cart';

export default function DeleteItem(props: { id: number }) {
  const handleDeleteItem = () => removeFromCart(props.id);

  return (
    <Button type="small" onClick={handleDeleteItem}>
      Delete
    </Button>
  );
}
