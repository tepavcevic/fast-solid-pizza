import Button from '../../components/button';
import { removeFromCart } from '../../store/cart';

export default function DeleteItem({ id }: { id: number }) {
 const handleDeleteItem = () => removeFromCart(id);

  return (
    <Button type="small" onClick={handleDeleteItem}>
      Delete
    </Button>
  );
}
