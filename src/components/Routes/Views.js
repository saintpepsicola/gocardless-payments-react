import React from 'react'
import Repeats from '../RepeatsList/RepeatsList'
import Search from '../Search/SearchContainer'
import OrderDetails from '../OrderDetails/OrderDetailsContainer'
import QuickActions from '../QuickActions/QuickActionsContainer'

export const Dashboard = () => {
        return (
                <div>
                        <Search />
                        <Repeats />
                </div>
        )
}

export const OrderDetailsPage = () => <OrderDetails />

export const OuickActionsPage = () => <QuickActions />