import React from 'react'
import RepeatsList from '../RepeatsList/RepeatsListContainer'
import Search from '../Search/SearchContainer'
import OrderDetails from '../OrderDetails/OrderDetailsContainer'
import QuickActions from '../QuickActions/QuickActionsContainer'

// DASHBOARD
export const Dashboard = () => {
        return (
                <div>
                        <Search />
                        <RepeatsList />
                </div>
        )
}

// ORDER DETAILS
export const OrderDetailsPage = () => {
        return (
                <div>
                        <Search />
                        <OrderDetails />
                </div>
        )
}

// QUICK ACTIONS
export const OuickActionsPage = () => <QuickActions />