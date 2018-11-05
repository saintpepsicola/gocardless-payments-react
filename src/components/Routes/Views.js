import React from 'react'
import Repeats from '../RepeatsList/RepeatsList'
import Search from '../Search/SearchContainer'
import OrderDetails from '../OrderDetails/OrderDetailsContainer'

export const Dashboard = () => {
        return (
                <div>
                        <Search />
                        <Repeats />
                </div>
        )
}

export const OrderDetailsPage = () => {
        return (
                <OrderDetails />
        )
}