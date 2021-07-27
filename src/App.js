import "./App.css";
import "./Margin-padding-bootstrap.css";
import axios from "axios";
import { useState, useEffect } from "react"; // HOOKS
import Header from "./components/Header";
import Footer from "./components/Footer";

// font awesome example
// link : https://apollo.lereacteur.io/course/5f3e73f7ac3b9c0017f4e8d6/60c87cc1b8f3860017db4a3f
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpaceShuttle } from "@fortawesome/free-solid-svg-icons";
library.add(faSpaceShuttle);

function App() {
  const [data, setData] = useState(null); //données de l'api
  const [cart, setCart] = useState([]); // éléments dans le panier
  const [subTotal, setSubTotal] = useState(0); // sous total du panier
  const [total, setTotal] = useState(0); // total du panier
  const [deliveryPrice, setDeliveryPrice] = useState(2.5); // prix de livraison
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // permet d'executer une seule fois le code au démarrage de l'app
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-clone-mm.herokuapp.com/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    // return;
    // ce qui va se passer quand le composant est démonté
  }, []);

  const addMeal = (meal) => {
    //  check if key exists use find function

    const newCart = [...cart];
    const mealExists = newCart.find((item) => item.id === meal.id);
    if (mealExists) {
    
      mealExists.quantity++;
      setSubTotal(subTotal + Number(meal.price));
      setCart(newCart);
    } else {
      newCart.push({ ...meal, quantity: 1 });
      setSubTotal(subTotal + Number(meal.price));
      setCart(newCart);
    }
  };

  const removeMeal = (meal) => {
    //  check if key exists use find function

    const newCart = [...cart];
    const mealExists = newCart.find((item) => item.id === meal.id);
    if (mealExists) {
 
      mealExists.quantity--;
      setSubTotal(subTotal - Number(meal.price));
      setCart(newCart);
    }
    // else {
    //   newCart.push({ ...meal, quantity: 1 });
    //   setSubTotal(subTotal + Number(meal.price));
    //   setCart(newCart);
    // }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="global">
          <div className="container-fluid">
            <div className="sub-header">
              <div className="left">
                <h1 className="my-4">{data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </div>
              <div className="right p-3">
                <div className="">
                  <img src={data.restaurant.picture} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="container70 p-2">
              {/* loop category from here */}

              {/* categories.name.meals */}
              {/* meals : id, title, description, price, picture, popular */}
              {data.categories.map((categories) => {
                return (
                  categories.meals.length > 0 && (
                    <>
                      <h2 className="my-4">{categories.name}</h2>
                      {/* cacher les catégories qui n'ont pas de meal */}

                      <div className="row">
                        {categories.meals.map((meal) => {
                          return (
                            <div
                              className="card br-10 p-3 hvr-shadow-radial"
                              key={meal.id}
                              onClick={() => {
                                addMeal(meal);
                              }}
                            >
                              <div className="card-left p-2">
                                <div className="title ">{meal.title}</div>
                                <div className="description ">
                                  {meal.description
                                    ? meal.description.slice(0, 90) + " ..."
                                    : ""}
                                </div>
                                <div className="price ">
                                  {meal.price} €{" "}
                                  <span>{meal.popular ?? "★ Populaire"}</span>
                                </div>
                              </div>
                              <div className="card-right p-1">
                                {meal.picture ? (
                                  <img src={meal.picture} alt="" />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )
                );
              })}
            </div>

            <div className="container30">
              <div className="cart br-10 mt-5 p-2">
                <button className="btn-cart br-10 hvr-glow">
                  Valider mon panier
                </button>
                <div className="cart-container mt-3 p-2">
                  {/* <div> */}

                  {cart.map((item, index) => {
                    return (
                      <div className="cart-item" key={index}>
                        {item.quantity > 0 && ( // si la quantité est supérieur à 0
                          <>
                            <button onClick={() => removeMeal(item)}>-</button>
                            <span> {item.quantity} </span>
                            <button onClick={() => addMeal(item)}>
                              +
                            </button>{" "}
                            {item.title}{" "}
                            {(item.price * item.quantity).toPrecision(4)} €
                          </>
                        )}
                      </div>
                    );
                  })}

                  <div className="hr my-2" />
                  <div className="sub-total">
                    <div className=""> Sous total</div>
                    <div className="price">
                      {subTotal ? subTotal.toPrecision(4) + "€" : ""}
                    </div>
                  </div>
                  <div className="hr my-2" />
                  <div className="delivery-amount">
                    <div className=""> Frais de livraison</div>
                    <div className="delivery-price">2.50€ </div>
                  </div>

                  <div className="hr my-2" />
                  <div className="total">
                    <div className="">Total </div>
                    <div className="">
                      {(subTotal + deliveryPrice).toPrecision(4)} €{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
