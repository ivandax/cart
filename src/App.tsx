import { ProductCatalog } from "./components/ProductCatalog";
import { useBasket } from "./hooks/useBasket";
import { catalogue, deliveryRules } from "./persistence/config";

function App() {
  const basket = useBasket(catalogue, deliveryRules);

  return (
    <div>
      <ProductCatalog catalogue={catalogue} onProductClick={basket.add} />
    </div>
  );
}

export default App;
