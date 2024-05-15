import Button from '../../components/button';
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
} from '../../store/cart';

export default function UpdateItemQuantity(props: {
  id: number;
  currentQuantity: number;
}) {
  const handleIncreaseQuantity = () => increaseCartItemQuantity(props.id);
  const handleDecreaseQuantity = () => decreaseCartItemQuantity(props.id);
  return (
    <div class="flex items-center gap-1 md:gap-3">
      <Button variant="round" onClick={handleDecreaseQuantity}>
        -
      </Button>
      <span class="text-sm font-medium">{props.currentQuantity}</span>
      <Button variant="round" onClick={handleIncreaseQuantity}>
        +
      </Button>
    </div>
  );
}
