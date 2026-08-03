export const updateCart = (state) => {
  //   Calculate items price
  state.itemsPrice = state.cartItems
    .reduce((acc, curVal) => acc + curVal.price * curVal.qty, 0)
    .toFixed(2);

  //   Calculate shipping Price
  state.shippingPrice = (+state.itemsPrice > 5000 ? 0 : 300).toFixed(2);

  //   Calculate tax Price
  state.taxPrice = (0.18 * +state.itemsPrice).toFixed(2);

  // Total Price
  state.totalPrice = (
    +state.itemsPrice +
    +state.shippingPrice +
    +state.taxPrice
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
