import { useContext, useState } from "react";
import { DataContext } from "./Context";

export default function Home() {

    const context = useContext(DataContext)

    const [animation, setAnimation] = useState({id:'', class:""})

    function contains(arr, elem) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === elem) {
                return true;
            }
        }
        return false;
    }



    function AddPet(id) {
        for (let pet of context.pets) {
            if (pet.id === id && !contains(context.user.basket, id)) {
                let copy = Object.assign({}, context.user)
                copy.basket.push({id:id, kol:1})
                context.setUser(copy)
                console.log(context.user.basket);
            } else if (pet.id === id && contains(context.user.basket, id)) {
                let copy = Object.assign({}, context.user)
                copy.basket = copy.basket.map((elem) => {
                    elem.kol = Number(elem.kol)
                    if (elem.id === id) {
                        elem.kol += 1
                    }
                    return elem
                })
                context.setUser(copy)
                
            }
           
        }
    }

    let result = context.pets.map(pet => {
        return <div key={pet.id} className='block'>
            <h1 className="title">{pet.name}</h1>
            <p className="text">Статус:{pet.status}</p>
            {context.user !== null ?  <button onClick={() => {AddPet(pet.id); setAnimation(pet.id, 'block active'); setTimeout(() => setAnimation(pet.id, 'block'), 500)}}>Добавить в корзину</button>: ''}
        </div>
    })

    return result
}