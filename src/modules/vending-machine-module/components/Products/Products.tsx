import { Product, initialVendingMachineState } from "../../../../store/store";
import SingleProduct from "./SingleProduct";
const productsArray: Product[] = initialVendingMachineState.products;
const Products = () => {
  return (
    <div className="products-container">
      {productsArray.map((product: Product) => {
        return (
          <SingleProduct key={product.id} product={product}></SingleProduct>
        );
      })}
    </div>
  );
};

export default Products;
