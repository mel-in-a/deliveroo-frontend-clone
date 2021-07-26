import "./App.css";
import "./Margin-padding-bootstrap.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import { useState, useEffect } from "react"; // HOOKS

// font awesome example
// link : https://apollo.lereacteur.io/course/5f3e73f7ac3b9c0017f4e8d6/60c87cc1b8f3860017db4a3f
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpaceShuttle } from "@fortawesome/free-solid-svg-icons";
library.add(faSpaceShuttle);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(true);

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

      <div className="container-fluid">
        <div className="sub-header">
          <div className="left p-3">
            <h1 className="my-4">Le pain quotidien - Montorgueil</h1>
            <p>
              Profitez de chaque plaisir de la vie quotidienne. Le Pain
              Quotidien propose des ingrédients simples et sains, du bon pain,
              des fruits et des légumes frais et de saison issus de
              l’agriculture biologique.
            </p>
          </div>
          <div className="right p-3">
            <div className="">
              <img src="/img/header-image.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="container70 p-2">
          {/* loop category from here */}
          {isLoading ? <div>Loading...</div> : <div>Hello world!</div>}

          {/* categories.name.meals */}
          {/* meals : id, title, description, price, picture, popular */}
          {data.map((datas) => {
            return <h2 className="my-3">{datas.categories}</h2>;
          })}

          <div className="row">
            {/* TODO loop cards from here */}
            <div className="card br-5 p-3">
              <div className="card-left">
                <div className="title mb-4">Brunch authentique 1 personne</div>
                <div className="description my-3">
                  Assiette de jambon cuit, jambon fumeì, terrine, comté bio &
                </div>
                <div className="price mt-5">
                  25,00 € <span>xxx</span>
                </div>
              </div>
              <div className="card-right p-1">
                <img src="/img/item-image.jpg" alt="" />
              </div>
            </div>
            {/* end loop */}
          </div>
        </div>

        <div className="container30">
          <div className="cart br-10 mt-5 p-2">
            <button className="btn-cart br-10">Valider mon panier</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
