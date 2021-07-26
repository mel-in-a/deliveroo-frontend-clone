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
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  return (
    <div>
      <Header />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="global">
          <div className="container-fluid">
            <div className="sub-header">
              <div className="left p-3">
                <h1 className="my-4">{data.restaurant.name}</h1>
                <p>
                {data.restaurant.description}
                </p>
              </div>
              <div className="right p-3">
                <div className="">
                  <img src=  {data.restaurant.picture} alt="" />
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
                  <>
                    <h2 className="my-3">{categories.name}</h2>
                    {/* cacher les catégories qui n'ont pas de meal */}
               
                    <div className="row">
                      {categories.meals.map((meal) => {
                        return (
                          
                          <div className="card br-5 p-3">
                            <div className="card-left">
                              <div className="title mb-4">{meal.title}</div>
                              <div className="description my-3">
                                {meal.description.slice(0,90)} ...
                              </div>
                              <div className="price mt-3">
                                {meal.price} € <span>{meal.popular ?? '★ Populaire'}</span>
                              </div>
                            </div>
                            <div className="card-right p-1">
                              {meal.picture ? <img src={meal.picture} alt=""  /> :''}
                              {/* <img src={meal.picture} alt="" /> */}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>

            <div className="container30">
              <div className="cart br-10 mt-5 p-2">
                <button className="btn-cart br-10">Valider mon panier</button>
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
