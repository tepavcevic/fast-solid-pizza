import { RouteLoadFuncArgs, redirect } from '@solidjs/router';
import { getOrder } from '../../services/apiRestaurant';

const orderData = ({ params }: RouteLoadFuncArgs) => {
  if (!params.orderId) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect('/menu');
  }
  // eslint-disable-next-line no-void
  void getOrder(params.orderId);
};

export default orderData;
