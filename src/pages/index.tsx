/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react'
import styles from '../styles/home.module.css'
import { Inter } from '@next/font/google'
import { LogoCloudinary } from '@/components/logoCloudinary'
import SelectCustomColor from '@/components/SelectCustomColor'
import { MainImage } from '@/components/MainImage'
import { Loader } from '@/components/Loader'
import { SelectColorBar } from '@/components/SelectColorBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [customColor, setCustomColor] = useState<string>('#dddddd')
  const [customText, setCustomText] = useState<string>('')
  const [customTextToSend, setCustomTextToSend] = useState<string>('')

  const [addLogo, setAddLogo] = useState<string>('')

  const [selectedFile, setSelectedFile] = useState<any>()
  const [selectedMainImage, setSelectedMainImage] =
    useState<any>('t-shirt1_z8hyax')

  const [loading, setLoading] = useState(false)

  const inputFileRef = useRef<any>(null)

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomText(event.target.value)
  }

  const handleTextSend = () => {
    setCustomTextToSend(customText)
    setCustomText('')
  }

  const selectFileHandler = (e: any) => {
    setSelectedFile(e.target.files[0])
  }

  const handlerSubmit = async (event: any) => {
    event.preventDefault()

    try {
      setLoading(true)
      const data = new FormData()
      data.append('file', selectedFile)
      data.append('upload_preset', 'hackatonCloudinary')

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/carlosjaramillo-igloolab/image/upload',
        {
          method: 'POST',
          body: data,
        }
      )

      const file = await res.json()
      setAddLogo(file.public_id)
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
        if (inputFileRef.current) {
          inputFileRef.current.value = null
        }
      }, 3000)
    }
  }

  return (
    <section
      className={`${styles.bgColorDarkBlue} 'w-full text-white grid grid-cols-2  '`}
    >
      <header className='col-start-1 col-end-3 h-14 p-3'>
        <h1 className={styles.interFamily}>Product personalization</h1>
      </header>
      <main className='col-start-1 col-end-2 border border-gray-500 grid place-content-center bg-white rounded-md ml-3'>
        {loading ? (
          <div
            className='h-96 grid place-content-center'
            style={{ minHeight: 500 }}
          >
            <Loader />
          </div>
        ) : (
          <MainImage
            color={customColor || '#dddddd'}
            customText={customTextToSend}
            selectedManImage={selectedMainImage}
            addLogo={addLogo}
          />
        )}

        {/* ImageThumbs */}
        <div id='imageThumbs'>
          <ul
            id='thumbs'
            className='flex justify-center gap-1 border-2 border-gray-200'
          >
            <li
              className='active hover:cursor-pointer'
              id='hangingThumb11'
              onClick={() => setSelectedMainImage('tshirt-only_pddgyw')}
            >
              <img
                id='hangingThumb1'
                src={`https://res.cloudinary.com/carlosjaramillo-igloolab/image/upload/h_170/e_replace_color:${customColor
                  .split('')
                  .slice(1, customColor.length)
                  .join('')}/v1677283818/tshirt-only_pddgyw.webp`}
              />
            </li>
            <li
              className='active hover:cursor-pointer'
              id='layingThumb'
              onClick={() => setSelectedMainImage('t-shirt1_z8hyax')}
            >
              <img
                src={`https://res.cloudinary.com/carlosjaramillo-igloolab/image/upload/h_150/e_replace_color:${customColor
                  .split('')
                  .slice(1, customColor.length)
                  .join('')}/v1677198943/t-shirt1_z8hyax.png`}
              />
            </li>
            <li
              className='active hover:cursor-pointer'
              id='modelThumb'
              onClick={() => setSelectedMainImage('front_white_cp3blm')}
            >
              <img
                src={`https://res.cloudinary.com/carlosjaramillo-igloolab/image/upload/h_150/e_replace_color:${customColor
                  .split('')
                  .slice(1, customColor.length)
                  .join('')}:100:white/v1677283830/front_white_cp3blm.png`}
              />
            </li>
          </ul>
        </div>
        {/* ENDImageThumbs */}
      </main>

      <aside className='col-start-2 col-end-3 flex items-center p-5  '>
        <section className='flex flex-col gap-10 '>
          {/* Select Color */}
          <section>
            <p>Select color:</p>
            <SelectColorBar setCustomColor={setCustomColor} />
            {/* End SelectColor */}
            <p>Or select a custom color:</p>
            <SelectCustomColor
              setCustomColor={setCustomColor}
              customColor={customColor}
            />
          </section>
          {/* end Select Color */}
          <hr />
          {/* add text section */}
          <section className='flex flex-col justify-center items-end w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0'>
            <section>
              <label htmlFor='customText'>Add some text: </label>
              <input
                className='rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                id='customText'
                type='text'
                value={customText}
                onChange={handleTextChange}
                placeholder='your text here...'
              />
            </section>

            <button
              onClick={handleTextSend}
              type='button'
              className=' h-max  py-2 px-4 flex justify-center items-center  bg-yellow-600 hover:bg-yellow-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
            >
              <svg
                width='20'
                height='20'
                fill='currentColor'
                className='mr-2'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z'
                  fill='currentColor'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7Z'
                  fill='currentColor'
                />
              </svg>
              add
            </button>
          </section>
          {/* End text section */}
          <hr />
          {/* add Image logo */}
          <section>
            <p>Add logo</p>
            <ul className='flex gap-1'>
              <li
                className='hover: cursor-pointer'
                onClick={() => setAddLogo('midulogo_oxhhiu')}
              >
                <img
                  src={`https://res.cloudinary.com/carlosjaramillo-igloolab/image/upload/h_35/v1678138704/midulogo_oxhhiu.png`}
                  alt=''
                />
              </li>
              <li
                className='hover: cursor-pointer'
                onClick={() => setAddLogo('deadpool-logo_m0jkp7')}
              >
                <img
                  src={`https://res.cloudinary.com/carlosjaramillo-igloolab/image/upload/h_30/v1677297520/deadpool-logo_m0jkp7.png`}
                  alt=''
                />
              </li>
              <li
                className='hover: cursor-pointer'
                onClick={() => setAddLogo('reacjslogo2_mrzdva')}
              >
                <img
                  src={`https://res.cloudinary.com/carlosjaramillo-igloolab/image/upload/h_30/v1677299411/reacjslogo2_mrzdva.png`}
                  alt=''
                />
              </li>
            </ul>
            <form onSubmit={handlerSubmit} className='flex flex-col gap-2 mt-5'>
              <p>Or add custom logo:</p>
              <input
                ref={inputFileRef}
                type='file'
                onChange={selectFileHandler}
                className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
              />
              <button
                type='submit'
                className=' h-max  py-2 px-4 flex justify-center items-center  bg-yellow-600 hover:bg-yellow-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
              >
                <svg
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='mr-2'
                  viewBox='0 0 1792 1792'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z'></path>
                </svg>
                add
              </button>
            </form>
          </section>
          {/* end Image logo */}
        </section>
      </aside>

      <footer className='col-start-1 col-end-3  h-8 flex gap-2 justify-center mt-4 items-center'>
        <span>powered by:</span>
        <a
          href='https://www.cloudinary.com'
          target={'_blank'}
          rel={'noreferrer'}
        >
          <LogoCloudinary />
        </a>
      </footer>
    </section>
  )
}
