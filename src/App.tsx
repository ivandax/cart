import { ProductCatalog } from "./components/ProductCatalog";
import { OrderSummary } from "./components/OrderSummary";
import { useBasket } from "./hooks/useBasket";
import { catalogue, deliveryRules, offers } from "./persistence/config";

function App() {
  const basket = useBasket(catalogue, deliveryRules, offers);

  return (
    <div className="app-container">
      <div className="left-panel">
        <ProductCatalog catalogue={catalogue} onProductClick={basket.add} />
      </div>
      <div className="right-panel">
        <OrderSummary
          itemIds={basket.itemIds}
          catalogue={catalogue}
          deliveryRules={deliveryRules}
          onRemoveItem={basket.remove}
          subtotal={basket.subtotal}
          total={basket.total}
        />
      </div>
    </div>
  );
}

export default App;
