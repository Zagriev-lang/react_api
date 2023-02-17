import { useContext } from "react";
import '../App.css'
import { DataContext } from "./Context";

export default function Order() {

  const context = useContext(DataContext)

  console.log(context);
  let result = context.user.order.map((order) => {
            let pet = GetPetById(order.id);
        return (
        <div key={pet.id} className="block">
            <h1 className="title">{pet.name}</h1>
            <p className="text">Статус: Оформлен</p>
            <p>Количество: {order.kol}</p>
            <p className="text">
            </p>
        </div>
        );
  });

  function GetPetById(id) {
    for (let pet of context.pets) {
      if (pet.id === id) return pet;
    }
  }

  return (
    <div>
      {result}
    </div>
  );
}
