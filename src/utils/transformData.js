//feel free to use lodash; it provides alot of type methods that are native to other languages
//import {function} from 'lodash';

//transform data if needed here

/*
@desc: custom sort function, sorts by order count and order revenue if count is equal
@params: Object{}
@params: Object{}
@output: Array[]
*/
const productSort = (a, b) => {
  const aOrderCount = a.order_count;
  const aValue = a.vendor_price.value;
  const aScale = a.vendor_price.scale;
  const aRevenue = (aOrderCount * (aValue / aScale)).toFixed(2); // this is the formula to calcuate revenue

  const bOrderCount = b.order_count;
  const bValue = b.vendor_price.value;
  const bScale = b.vendor_price.scale;
  const bRevenue = (bOrderCount * (bValue / bScale)).toFixed(2);

  // if order counts are equal then sort by revenue instead
  if (aOrderCount === bOrderCount) {
    return bRevenue - aRevenue;
  }

  return bOrderCount - aOrderCount;
}

/*
@desc: main export function, takes in payload from AJAX and merges all product arrays then sorts them
@params: Array[]
@output: Array[]
*/

export default function transformData(data) {
  // create allProducts array and push all product arrays into it
  const allProducts = [];

  for (let i = 0; i < data.length; i++) {
    allProducts.push(data[i].products);
  }

  // reduce the allProducts array into a singular allProductsMerged array
  const allProductsMerged = allProducts.reduce((prev, curr) => {
    return prev.concat(curr);
  });

  // filter out repeat information to obtain only unique product info
  const filterOutDuplicatesHash = {};

  for (let i = 0; i < allProductsMerged.length; i++) {
    const name = allProductsMerged[i].name;

    if (!filterOutDuplicatesHash.hasOwnProperty(name)) {
      filterOutDuplicatesHash[name] = allProductsMerged[i];
    }
  }

  // create and push unique product info into a filtered array
  const filteredAndSortedProducts = [];

  for (let key in filterOutDuplicatesHash) {
    filteredAndSortedProducts.push(filterOutDuplicatesHash[key]);
  }

  // now sort the array by the custom comparator utility function written above
  filteredAndSortedProducts.sort(productSort);

  // slice a copy of the top ten selling products only
  const topTenProducts = filteredAndSortedProducts.slice(0, 10);

  // return the top ten selling products
  return topTenProducts;
};

