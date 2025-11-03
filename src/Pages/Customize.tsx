import React, { useRef, useState } from 'react'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import Cart from '../Component/Cart'
import { Upload } from 'lucide-react'

const images = [image1, image2, image3, image4, image5, image6, image7]


const Customize: React.FC = () => {

    const [backendImage, setBackendImage] = useState<File | null>(null)
    const [frontendImage, setFrontendImage] = useState<string | null>(null)

    const inputImageRef = useRef<HTMLInputElement | null>(null)
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setBackendImage(file)
            setFrontendImage(URL.createObjectURL(file))
        }
    }

    console.log(backendImage);

    return (
        <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center py-10">
            <h1 className="text-white text-[28px] font-semibold text-center mb-10">
                Select your <span className="text-blue-400">Assistant Image</span>
            </h1>

            <div className="w-[90%] max-w-[1200px] flex justify-center flex-wrap gap-6">
                {images.map((img, index) => (
                    <Cart key={index} image={img} />
                ))}

                {frontendImage ? <Cart image={frontendImage} /> : <div
                    onClick={() => inputImageRef.current?.click()}
                    className="w-[185px] h-[250px] bg-[#030326] border-2 border-[#0c0c8f] rounded-2xl flex justify-center items-center
                    hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/50">
                    <Upload className="w-16 h-16 text-white" />
                </div>}

                <input type="file" accept="image/*" ref={inputImageRef} hidden onChange={handleImage}/>

            </div>
            <button className='py-2 px-10 bg-white text-black rounded-full text-2xl mt-5 font-semibold'>Next</button>
        </div>
    )
}

export default Customize
