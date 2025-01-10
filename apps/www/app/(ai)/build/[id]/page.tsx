import React from 'react'
import Analysis from 'www/components/section/analysis/Analysis'


const BuildPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className=' flex-1 mx-4 flex flex-col '><Analysis /></div>
  )
}

export default BuildPage