import React from 'react'
import RepeatsList from '../RepeatsList/RepeatsListContainer'
import OrderDetails from '../OrderDetails/OrderDetailsContainer'
import Search from '../Search/SearchContainer'

// DASHBOARD
export const Dashboard = () => <RepeatsList />
// SEARCH
export const SearchBar = () => <Search />
// ORDER DETAILS
export const OrderDetailsPage = () => <OrderDetails />