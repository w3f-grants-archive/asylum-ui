import { Button } from 'components/button'
import { HeadingLg } from 'components/text/heading-lg'
import { Paragraph } from 'components/text/paragraph'
import * as React from 'react'
import emptyImage from '../../assets/img/empty-img.jpg'

interface IProps {
   title: string
   img: string
   id: string
   description?: string
}

export const TemplateItem: React.FC<IProps> = ({ title, img, id }) => {
   return (
      <div className="bg-white p-5 rounded-2xl gradient-hover-effect cursor-pointer">
         <div className="">
            <HeadingLg>{title}</HeadingLg>
         </div>
         {/* eslint-disable-next-line max-len */}
         <div className="py-3.5 aspect-square">
            {img.length > 1
               ? <img className="rounded-2xl aspect-square object-cover" src={img} alt={title} />
               : <img className="rounded-2xl aspect-square object-cover" src={emptyImage} alt="Your games" />
            }
         </div>
         <Paragraph className="indent-2 text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
         </Paragraph>
         <div className="flex flex-row justify-between items-center">
            <Paragraph className="text-gray-800">0xFR56.....F71D</Paragraph>
            <Button variant="dark" onClick={console.log}>mint item</Button>
         </div>
      </div>
   )
}
