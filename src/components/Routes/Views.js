import React from 'react'


import Repeats from '../RepeatsList/RepeatsList'
import Search from '../Search/SearchContainer'

export const Dashboard = () => {
        return (
                <div>
                        <Search />
                        <Repeats />
                </div>
        )
}