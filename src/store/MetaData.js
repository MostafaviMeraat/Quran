import React, { startTransition, useEffect, useState } from 'react'
import { QuranDataSura, QuranDataPage } from '../quran-resources (farawin)/quran-metadata.js'
import { createContext } from 'react'
import emla from '../quran-resources (farawin)/quran-text-emla.json'



const MetaData = () => {

  let pageContent = []
  const sura = createContext(QuranDataSura)
  const page = createContext(QuranDataPage)

  const search = (e) => {

    pageContent = []

    const pageNumber = parseInt(e.target.value)
    const start = page._currentValue[pageNumber]
    const end = page._currentValue[pageNumber + 1]

    // console.log(start, end)
    try {

      if (start[0] === end[0]) {

        const startPrime = sura._currentValue[start[0]][0] + start[1]
        const endPrime = sura._currentValue[end[0]][0] + end[1]

        for (let i = startPrime - 1; i < endPrime - 1; i++) {
          pageContent.push(emla[i])
        }

        console.log(`start: ${start}`, `end: ${end}`, `startPrime: ${startPrime}`, `endPrime: ${endPrime}`);
        console.log(pageContent)
      }
      else {

        const startPrime = sura._currentValue[start[0]][0] + start[1]
        const endOfSura = sura._currentValue[start[0]][1] - start[1]

        for (let i = startPrime - 1; i < startPrime + endOfSura; i++) {
          pageContent.push(emla[i])
        }
        console.log(pageContent);

      }
    }
    catch (err) {

    }


  }


  return (
    <div>
      <input type='number'
        onChange={search}
      />
      <br />
    </div>
  )
}

export default MetaData