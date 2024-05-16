import React from "react";
import { fetchProduct } from "@/data/product";
const greet = async () => {
  const pageNumber = 1;
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchProduct({ take, skip });
  console.log(data);
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.product.name}</h3>
          <p>{item.product.cat}</p>
          <p>Sell Price: {item.sellprice}</p>
          <p>Stock: {item.product.stock}</p>
        </div>
      ))}
    </div>
  );
};

export default greet;
