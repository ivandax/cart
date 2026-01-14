import { ProductCatalog } from "./components/ProductCatalog";
import { useBasket } from "./hooks/useBasket";
import { catalogue, deliveryRules } from "./persistence/config";

function App() {
  const basket = useBasket(catalogue, deliveryRules);

  return (
    <div className="app-container">
      <div className="left-panel">
        <ProductCatalog catalogue={catalogue} onProductClick={basket.add} />
      </div>
      <div className="right-panel">
        {/* Basket will go here */}
      </div>
    </div>
  );
}

export default App;
