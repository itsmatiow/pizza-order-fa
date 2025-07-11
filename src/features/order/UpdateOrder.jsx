import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">میخواهم سفارشم در اولویت باشد.</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const order = await getOrder(params.orderId);
  const priorityPrice = Math.round(order.orderPrice * 0.2);
  const data = { priority: true, priorityPrice };
  await updateOrder(params.orderId, data);
  return null;
}
