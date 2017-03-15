import React from 'react';
import TopSalesList from './top_sales.component.js';

//export component

const Index = () => {
  return (
    <main>
      <TopSalesList></TopSalesList>
    </main>
  )
}

export default Index;

// this component's job is act as the overall container for the application, hence the semantic main tag