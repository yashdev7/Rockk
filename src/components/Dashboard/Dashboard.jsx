import React from 'react'
import HeaderLayout from '../Layouts/HeaderLayout';
import Grid from './Grid'
import Charts from './Charts'
const Dashboard = () => {
  return (
    <HeaderLayout>
      <Charts />
      <Grid />
    </HeaderLayout>
  )
}

export default Dashboard
