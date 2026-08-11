import { Link } from "react-router-dom";

import Alert from "@components/Alert";
import Loader from "@components/Loader";
import { useGetMyOrdersQuery } from "@slices/orderApiSlice";

const MyOrdersScreen = () => {
  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetMyOrdersQuery();

  return (
    <div className="bg-white">
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Alert type="error">
          {errorOrders?.data?.message || errorOrders?.error}
        </Alert>
      ) : (
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-10 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Order History
            </h1>
          </div>

          <div className="mt-16">
            <h2 className="sr-only">Recent Orders</h2>

            <div className="space-y-20">
              {orders?.length === 0 ? (
                <Alert type="info">You have no orders yet.</Alert>
              ) : (
                orders?.map((order, i) => (
                  <div key={order._id}>
                    <div className="rounded-lg bg-slate px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                      <dl className="flex flex-auto justify-between space-y-6 divide-y divide-slate-200 text-sm text-slate-600 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-full lg:flex-none lg:gap-x-8">
                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                          <dt className="font-medium text-slate-900">
                            <span className="opacity-50">#{i + 1}</span> &nbsp;
                            Order ID
                          </dt>
                          <dd className="sm:mt-1">{order._id}</dd>
                        </div>

                        {/* Order Date */}
                        <div className="flex justify-between sm:block">
                          <dt className="font-medium text-slate-900">
                            Date Placed
                          </dt>
                          <dd className="sm:mt-1">
                            <time dateTime={order.createdAt}>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </time>
                          </dd>
                        </div>

                        {/* Delivered At */}
                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                          <dt classNAme="font-medium text-slate-900">
                            Delivered At
                          </dt>
                          <dd className="sm:mt-1">
                            {new Date(order.deliveredAt).toUTCString() ||
                              "Not Delivered"}
                          </dd>
                        </div>
                        <div className="flex justify-between pt-6 font-medium text-slate-900 sm:block sm:pt-0">
                          <dt>Total Amount</dt>
                          <dd className="sm:mt-1">₹{order.totalPrice}</dd>
                        </div>

                        <Link
                          to={`/order/${order._id}`}
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                        >
                          View Order Details
                        </Link>
                      </dl>
                    </div>

                    <table className="mt-4 w-full text-slate-500 sm:mt-6">
                      <caption className="sr-only">Products</caption>
                      <thead className="sr-only text-left text-sm text-slate-500 sm:not-sr-only">
                        <tr>
                          <th
                            scope="col"
                            className="py-2 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="hidden w-1/5 py-2 pr-8 font-normal sm:table-cell"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="hidden w-1/5 py-2 pr-8 font-normal sm:table-cell"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="w-0 py-2 text-right font-normal"
                          >
                            <span className="sr-only">Info</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 border-b border-slate-200 text-sm sm:border-t">
                        {order?.orderItems?.map((item) => (
                          <tr key={item.product}>
                            <td className="py-3 pr-8">
                              <div className="flex items-center">
                                <img
                                  alt={item.src}
                                  src={item.image}
                                  className="mr-6 h-16 w-16 rounded object-center object-cover"
                                />
                                <div>
                                  <div className="font-medium text-slate-900">
                                    {item.name}
                                  </div>
                                  <div className="mt-1 sm:hidden">
                                    ₹{item.price}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="hidden py-3 pr-8 sm:table-cell">
                              ₹{item.price}
                            </td>
                            <td className="hidden py-3 pr-8 sm:table-cell">
                              <strong>{item.qty}</strong> x ₹{item.price} =₹
                              {item.qty * item.price}
                            </td>
                            <td className="whitespace-nowrap py-3 text-right font-medium">
                              <Link
                                to={`/product/${item.product}`}
                                className="text-indigo-600"
                              >
                                View
                                <span className="hidden lg:inline">Item</span>
                                <span className="sr-only">, {item.name}</span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersScreen;
