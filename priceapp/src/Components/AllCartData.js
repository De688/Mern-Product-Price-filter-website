import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { updateCart, fetchCart } from "../Redux/AddToCartSlice";
import axios from "axios";
import { CartQuantity } from "./CartQuantity";

import DeleteCartItem from "./DeleteCartItem";
import Loading from "../Loading/Loading";
import { fetchProducts } from "../Redux/AllProductsSlice.js";
import Stripe from "./Stripe";
import Test from "./Test";

function AllCartData() {
  const PublicFilder = "http://localhost:5000/images/";
  const { items, totalPrice } = useSelector((state) => state.cart);
  const data = useSelector((state) => state.products.data);

  const item = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const userId = user.id;

  const [CartData, setCartData] = useState(items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(userId));
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setCartData(items);
  }, [items]);

  return (
    <>
      <div className=" w-full hidden md:flex flex-col justify-center">
        {CartData.length === 0 ? (
          <div className="w-full h-[200px] mt-4 bg-white flex justify-center items-center">
            Your Cart is Empty!
          </div>
        ) : (
          <table className="table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 w-[200px]   py-2">Product image</th>
                <th className="px-4 py-2">Product name</th>

                <th className="px-4 w-[200px] py-2">Quantity</th>
                <th className="px-4 py-2">Product price</th>
                <th className="px-4 py-2">Remove </th>
              </tr>
            </thead>
            <tbody>
              {CartData.map((item) => {
                const selectedProduct = data.find(
                  (product) => product._id === item.productId
                );

                return (
                  <tr key={item.productId} className="text-center bg-white">
                    <td className="border w-[200px] px-4 py-2">
                      {" "}
                      <img
                        className="w-[100px] h-[100px]"
                        src={PublicFilder + selectedProduct?.product_image}
                        alt="product_image"
                      />{" "}
                    </td>
                    <td className="border px-4 py-2">
                      {selectedProduct?.product_name}
                    </td>

                    <td className="border w-[200px] px-4 py-2">
                      {item.productId ? (
                        <CartQuantity
                          productId={item.productId}
                          productQuantity={item.quantity}
                        />
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="border px-4 py-2">Tsh.{item.total}</td>
                    <td className="border px-4 py-2">
                      <DeleteCartItem productId={item.productId} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="w-[70%] flex justify-end items-center mt-10">
          <div className="  rounded-sm text-purple-900 text-2xl font-bold ">
            Total Price : <span>TSH.{totalPrice}</span>
          </div>
        </div>

        {/* <GetTotalprice /> */}
      </div>
      <div className=" w-full md:hidden flex flex-col justify-center">
        {CartData.length === 0 ? (
          <div className="w-full h-[200px] mt-4 bg-white flex justify-center items-center">
            Your Cart is Empty!
          </div>
        ) : (
          <table className="table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 w-[200px]   py-2">Product image</th>
                <th className="px-4 py-2">Product info</th>
              </tr>
            </thead>
            <tbody>
              {CartData.map((item) => {
                const selectedProduct = data.find(
                  (product) => product._id === item.productId
                );

                return (
                  <tr key={item.productId} className="text-center">
                    <td className="border w-[200px] px-4 py-2">
                      {" "}
                      <img
                        src={PublicFilder + selectedProduct?.product_image}
                        alt="product_image"
                      />{" "}
                    </td>
                    <td className="border px-4 h-[200px] py-2 flex flex-col justify-around items-start">
                      <div>{selectedProduct?.product_name}</div>
                      <div>
                        {item.productId ? (
                          <CartQuantity
                            productId={item.productId}
                            productQuantity={item.quantity}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div>Tsh.{item.total}</div>
                      <div>
                        {" "}
                        <DeleteCartItem productId={item.productId} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="w-[70%] flex justify-end items-center mt-10">
          <div className="  rounded-sm text-purple-900 text-xl font-bold flex items-end">
            Total Price : <span>TSH.{totalPrice}</span>
          </div>
        </div>
      </div>
      <div className="w-[70%] flex justify-end items-center mt-10">
        <Stripe price={totalPrice} />
      </div>
    </>
  );
}
export default AllCartData;
