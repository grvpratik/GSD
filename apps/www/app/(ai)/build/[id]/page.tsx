import React from 'react'
import Analysis from 'www/components/section/analysis/Analysis'
import { response } from "www/app/(ai)/layout";


const BuildPage = ({ params }: { params: { id: string } }) => {
  console.log(params.id)
const result=response.filter((data)=>data.id===Number(params.id))

  return (
    <div className=' flex-1 mx-4 flex flex-col '><Analysis res={result}/></div>
  )
}

export default BuildPage