import React, { Component } from 'react';
import Styles from './top_sales.scss';
import axios from 'axios';
import transformData from '../utils/transformData';
import TopSellers from './top_sellers.js';

//write top sales list component here

export default class TopSales extends Component {
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
        const data = payload.data; // this is because axios parse the return as JSON for us
        const topTen = transformData(data); // call transformData here so we can keep do this before presenting the data   
        this.setState({
          data: topTen
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // if state is ready, map over and show content, alternatively you could have a this.state.loading flag, here I just check for length of data and let javascript falsy/truthy values determine for me
  render() {
    if (this.state.data.length) {
      return(
        <section className="container">
          <header className="header">
            <h1 className="heading" tabIndex="1">Top Sales Items</h1> 
          </header>
          <section>
            <TopSellers sellers={this.state.data}/>
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
};
