import React from 'react'

function Header(){
    return (
        <div className='background' style={{
            position: 'fixed',
            width: '100%' ,
            height: '800px',
            minHeight: '800px',
            left: '0px',
            top: '0px',
            backgroundColor: 'rgb(230, 230, 230)',
            //backgroundSize: 'cover',
            //overflow: 'hidden'
        }}>
            <div className='header-box' style={{
                width: '100%',
                height: '40px',
                position: 'fixed',
                float: 'right',
                right: '0px',
                textAlign: 'right',
                paddingRight: '30px',
                backgroundColor: 'white'
            }}>
                
            </div>
        </div>
    )
}

export default Header