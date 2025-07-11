// Test ID: IIDSAT
import OrderItem from "./OrderItem";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">مشخصات سفارش #{id}</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase">
              اولویت
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase">
            {status} سفارش ثبت شده
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `سفارش شما ${calcMinutesLeft(estimatedDelivery)} دقیقه دیگر آماده می‌شود 😃`
            : "سفارش شما آماده تحویل است"}
        </p>
        {/* <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p> */}
        <p className="text-xs text-stone-500">
          (زمان آماده سازی:{" "}
          {estimatedDelivery ? formatDate(estimatedDelivery) : "نامشخص"})
        </p>
      </div>

      {/*نسخه اصلی کامنت شده */}
      {/* <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.id}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
          />
        ))}
      </ul> */}
      <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
        {cart.map((item) => {
          const pizza = fetcher?.data?.find((el) => el.id === item.pizzaId);
          const ingredients = pizza ? pizza.ingredients : [];

          return (
            <OrderItem
              key={item.id}
              item={item}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={ingredients}
            />
          );
        })}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          هزینه پیتزا: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            هزینه اولویت: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          مبلغ قابل پرداخت: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  order.orderPrice = Number(order.orderPrice);
  order.priorityPrice = Number(order.priorityPrice);
  return order;
}

export default Order;
