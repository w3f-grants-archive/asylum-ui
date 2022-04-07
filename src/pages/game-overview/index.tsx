import * as React from 'react'
import { Hr } from '../../components/hr'
import { HeadingXl } from '../../components/text/heading-xl'
import { GameDescription } from './game-description'

interface IProps {}

export const GameOverview: React.FC<IProps> = () => {
   return (
      <div className="container mx-auto">
         <div className="min-h-screen flex flex-col justify-center items-center">
            <HeadingXl>Game overview</HeadingXl>
            <Hr />
            <div className="flex flex-col gap-8 py-6">
               <GameDescription />
               <GameDescription />
            </div>
         </div>
      </div>
   )
}
