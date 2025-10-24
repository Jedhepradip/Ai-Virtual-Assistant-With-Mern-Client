import React from 'react'

interface CartProps {
    image: string;
}

const Cart: React.FC<CartProps> = ({ image }) => {
    return (
        <div className='w-[185px] h-[250px] bg-[#030326] border-2 border-[#0c0c8f] rounded-2xl overflow-hidden
    hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/50 flex justify-center items-center'>
            <img src={image} className='h-full w-full object-cover' />
        </div>
    )
}

export default Cart