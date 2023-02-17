import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./Context";

export default function Basket() {

  const context = useContext(DataContext)

  function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === elem) {
        return true;
      }
    }
    return false;
  }

  function AddOrder(user) {
    let copy = Object.assign({}, user);
    console.warn(copy.basket);
    for (let elem of copy.basket) {
      copy.order.push(elem)
    }
    copy.basket = []
    context.setUser(copy);
  }

  function DelPet(id) {
    context.setPets(
      context.pets.map((pet) => {
        if (pet.id == id && contains(context.user.basket, id)) {
          let copy = Object.assign({}, context.user);
          for (let i = 0; i < copy.basket.length; i++) {
            if (copy.basket[i].id === id) {
              copy.basket.splice(i, 1);
            }
          }
          context.setUser(copy);
        }
        return pet;
      })
    );
  }

  function setNum(num, id) {
    let copy = Object.assign({}, context.user);
    for (var i = 0; i < copy.basket.length; i++) {
      if (copy.basket[i].id === id) {
        copy.basket[i].kol = num;
      }
    }

    context.setUser(copy);
  }
  let result = context.user.basket.map((order, index) => {
    let pet;
    for (var i = 0; i < context.pets.length; i++) {
      if (context.pets[i].id === order.id) {
        console.log(context.pets, order);
        pet = context.pets[i];
        return (
          <div key={pet.id} className="block">
            <h1 className="title">{pet.name}</h1>
            <p className="text">Статус:{pet.status}</p>
            {context.user !== null ? (
              <label htmlFor="Num">Колличество: </label>
            ) : (
              ""
            )}
            {context.user !== null ? (
              <input
              className="NumInput"
                id="Num"
                type="number"
                value={context.user.basket[index].kol}
                onChange={(event) => {
                  setNum(event.target.value, context.user.basket[index].id);
                }}
              />
            ) : (
              ""
            )}
            {context.user !== null ? (
              <button onClick={() => DelPet(pet.id)}>
                Удалить с корзины
              </button>
            ) : (
              ""
            )}
          </div>
        );
      }
    }
  });

  return (
    <div>
      {result}
      <Link to='/order'><button
        onClick={() => {
          AddOrder(context.user);
        }}>
        Добавить в заказ
      </button></Link>
    </div>
  );
}
