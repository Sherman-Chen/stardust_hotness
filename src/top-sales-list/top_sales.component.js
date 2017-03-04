import React from 'react';
import Styles from './top_sales.scss';
import axios from 'axios';
import transformData from '../utils/transformData';

//write top sales list component here

export default class TopSales extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  // on mount AJAX request to grab data and set state
  componentDidMount() {
    axios.get('http://localhost:3000/PurchaseOrders')
      .then(payload => {
        const data = payload.data;
        const topTen = transformData(data);    
        this.setState({
          data: topTen
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // if state is ready, map over and show content
  render() {
    if (this.state.data.length) {

      // mapped top ten products
      let topTenSellers = this.state.data.map((product, index) => {
        const revenue = (product.order_count * (product.vendor_price.value / product.vendor_price.scale)).toFixed(2); // this is the formula to grab revenue

        return(
          <section key={index} className="product" tabIndex={(index + 1) + 1}>
            <div>
              <p className="bullet" role="bullet-ordering">{index + 1}</p>
            </div>
            <article className="product-container">
              <p className="product-name">{product.name}</p>
              <p className="product-revenue">${revenue}</p>
            </article>            
          </section>
          )
      });

      return(
        <section className="container">
          <header className="header">
            <h1 className="heading" tabIndex="1">Top Sales Items</h1> 
          </header>
          <section>
              {topTenSellers}
          </section>
        </section>
      )
    } else {
      // else return loading indicator
      return(
        <h1>Loading..</h1>
      )
    }
  }
}