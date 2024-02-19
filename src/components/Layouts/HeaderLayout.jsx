import React from 'react'
import Header from '../Header/Header';

const HeaderLayout = ({ children }) => {
    return (
        <div className='container'>
            <div style={{ minHeight: '100vh' }}  >
                <Header />
                {children}
            </div>
        </div>
    )
}

export default HeaderLayout