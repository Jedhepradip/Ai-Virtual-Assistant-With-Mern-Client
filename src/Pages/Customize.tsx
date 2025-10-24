import React from 'react'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import Cart from '../Component/Cart'
import { Upload } from 'lucide-react'

const Customize: React.FC = () => {

    const images = [image1, image2, image3, image4, image5, image6, image7]

    return (
        <div className='w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex justify-center items-center py-10'>
            <div className='w-[90%] max-w-[1200px] flex justify-center items-center flex-wrap gap-6'>
                {images.map((img, index) => (
                    <Cart key={index} image={img} />
                ))}

                <div className='w-[185px] h-[250px] bg-[#030326] border-2 border-[#0c0c8f] rounded-2xl overflow-hidden
                        hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/50'>
                    {/* <img src={image} className='h-full object-cover' /> */}
                    <Upload className='w-full h-full text-white p-10' />
                </div>
            </div>
        </div>
    )
}

export default Customize