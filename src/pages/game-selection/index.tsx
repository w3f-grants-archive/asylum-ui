import * as React from 'react'
import { GameTable } from '../../components/game-table'
import { Hr } from '../../components/hr'
import { Text3xl } from '../../components/text/text-3xl'

export const GameList = () => {
   return (
      <div className="px-14 py-7 rounded-xl">
         <Text3xl>Select a game</Text3xl>
         <Hr />
         <GameTable />
      </div>
   )
}
