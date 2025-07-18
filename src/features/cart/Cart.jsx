import { clearCart, getCart } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../user/userSlice";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUser);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&rarr; برگشت به منو</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">سبد خرید شما:{username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          سفارش
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          حذف همه
        </Button>
      </div>
    </div>
  );
}

export default Cart;
