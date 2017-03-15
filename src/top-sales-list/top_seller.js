import React from 'react';

const TopSeller = props => {
  const { product, index, revenue } = props;

  return (
    <section key={index} className="product" tabIndex={(index + 1) + 1}>
      <div>
        <p className="bullet" role="bullet ordering">{index + 1}</p>
      </div>
      <article className="product-container">
        <p className="product-name">{product.name}</p>
        <p className="product-revenue">${revenue}</p>
      </article>            
    </section>
  )
};

export default TopSeller;

// this is a purely presentational component, it's only purpose is to receive props and then format and make them look good
// it does not perform any business/logic operation