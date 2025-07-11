import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&rarr; برگشت به منو</LinkButton>

      <p className="mt-7 font-semibold">
        سبد خرید شما خالی است. لطفاً برای سفارش پیتزا به منو مراجعه کنید.
      </p>
    </div>
  );
}

export default EmptyCart;
