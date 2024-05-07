import Button from '../../components/button';
import { decreaseCartItemQuantity, increaseCartItemQuantity } from '../../store/cart';

export default function UpdateItemQuantity({
  id,
  currentQuantity,
}: {
  id: number;
  currentQuantity: number;
}) {
  const handleIncreaseQuantity = () => increaseCartItemQuantity(id);
  const handleDecreaseQuantity = () => decreaseCartItemQuantity(id);
  return (
    <div class="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={handleDecreaseQuantity}>
        -
      </Button>
      <span class="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleIncreaseQuantity}>
        +
      </Button>
    </div>
  );
}
