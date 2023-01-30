import React from "react";

function SearchProducts({ results }) {
  return (
    <div className="w-[600px] bg-white">
      <ul>
        {results?.map((result) => (
          <li className="text-[15px]" key={result._id}>
            {result.product_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchProducts;
