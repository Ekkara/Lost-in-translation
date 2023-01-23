import { useState } from "react";
import { orderAdd } from "../api/order";
import OrderForm from "../components/Orders/OrderForm";
import OrdersCoffeeButton from "../components/OrdersCoffeeButton";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";

const COFFEE = [
  {
    id: 1,
    name: "Americano",
    image: "images/americano.jpg",
  },
  {
    id: 2,
    name: "Cappuccino",
    image: "images/cappuccino.jpg",
  },
  {
    id: 3,
    name: "Latte",
    image: "images/latte.jpg",
  },
  {
    id: 4,
    name: "Espresso",
    image: "images/espresso.jpg",
  },
];

const Order = () => {
  const [coffee, setCoffee] = useState(null);
  const { user, setUser } = useUser();

  const handleCoffeeClicked = (coffeeId) => {
    setCoffee(COFFEE.find((coffee) => coffee.id === coffeeId));
  };
  const handleOrderClicked = async (notes) => {
    console.log(notes);
    if (!coffee) {
      alert("please select a coffee first!");
      return;
    }

    const order = (coffee.name + ' ' + notes).trim()

    const [error, updateUser] = await orderAdd(user, order);
    if(error !==null){
        return;
    }
    setUser(updateUser);
  };
  const availableCoffees = COFFEE.map((coffee) => {
    return (
      <OrdersCoffeeButton
        key={coffee.id}
        coffee={coffee}
        onSelect={handleCoffeeClicked}
      />
    );
  });

  return (
    <>
      <h1>Order</h1>
      <section id="order-options">{availableCoffees}</section>
      <section id="order-notes">
        <OrderForm onOrder={handleOrderClicked} />
      </section>
      <h4>Summary: </h4>
      {coffee && <p>Selected coffee: {coffee.name}</p>}
    </>
  );
};
export default withAuth(Order);
