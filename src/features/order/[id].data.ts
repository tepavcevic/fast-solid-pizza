import { RouteLoadFuncArgs, redirect } from "@solidjs/router";

import { getOrder } from "#src/services/apiRestaurant";

const orderData = ({ params }: RouteLoadFuncArgs) => {
  if (!params.id) {
    throw redirect("/menu");
  }
  // biome-ignore lint/complexity/noVoid: <explanation>
  void getOrder(params.id);
};

export default orderData;
