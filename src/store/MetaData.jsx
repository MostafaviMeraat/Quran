import React, { useState } from 'react'
import { QuranDataSura, QuranDataPage } from '../quran-resources (farawin)/quran-metadata.js'
import { createContext } from 'react'
import emla from '../quran-resources (farawin)/quran-text-emla.json'



const MetaData = () => {

  const sura = createContext(QuranDataSura)
  const page = createContext(QuranDataPage)
  const [pageContent, setPageContent] = useState([])
  let pages = []

  const search = (e) => {

    const pageNumber = parseInt(e.target.value)
    const start = page._currentValue[pageNumber]
    const end = page._currentValue[pageNumber + 1]

    if (start[0] === end[0]) {
      const startPrime = sura._currentValue[start[0]][0] + start[1]
      const endPrime = sura._currentValue[end[0]][0] + end[1]

      for (let i = startPrime - 1; i < endPrime - 1; i++) {
        pages.push(emla[i])
      }
      // console.log(`start: ${start}`, `end: ${end}`, `startPrime: ${startPrime}`, `endPrime: ${endPrime}`);
      setPageContent(pages)
    }
    else if (start[0] !== end[0] && end[1] !== 1) {
      const startPrime = sura._currentValue[start[0]][0] + start[1] - 1
      const endOfPage = sura._currentValue[end[0]][0] + end[1] - 1
      // console.log(emla[endOfPage]);
      for (let i = startPrime; i < endOfPage; i++) {
        pages.push(emla[i])
      }
      setPageContent(pages)

    }
    else if (start[0] !== end[0]) {
      const startPrime = sura._currentValue[start[0]][0] + start[1]
      const endOfSura = sura._currentValue[start[0]][1] - start[1]

      for (let i = startPrime - 1; i < startPrime + endOfSura; i++) {
        pages.push(emla[i])
      }
      setPageContent(pages)
    }

  }



  return (
    <div>
      <input
        autoFocus
        type='number'
        onChange={search}
      />
      <br />
      {pageContent.map((aya, index) => {
        return (<div key={index}>
          <p>{aya}</p>
          <br />
        </div>)
      })}
    </div>
  )
}

export default MetaData