import React, { Component } from 'react';
import TopSeller from './top_seller.js';

export default class TopSellers extends Component {
  render() {
    const { sellers } = this.props; // extract the sellers props

    const mappedSellers = sellers.map((product, index) => {
      const revenue = (product.order_count * (product.vendor_price.value / product.vendor_price.scale)).toFixed(2); // this is the formula to grab revenue
  
      return(
        <TopSeller product={product} index={index} revenue={revenue} key={index} /> // in the future I'd like to use a more unique key
      )
    });

    return(
      <div role='seller list'>
        {mappedSellers}
      </div>
    )
  }
};

/* this is my business logic container, it receives the data from the top level component and then maps the data
performs any neccessary operations, in this case calcuate revenue, and passes the data down as props 
to presentation component */