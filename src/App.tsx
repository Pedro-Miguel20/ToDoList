import { useState } from 'react'
import './App.css'
import Datepicker from 'react-tailwindcss-datepicker'

function DateChooser() {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: null,
  })

  return (
      <Datepicker 
            asSingle={true}
            useRange={false}
            value={date} 
            onChange={newDate => setDate(newDate)}
            displayFormat="DD/MM/YYYY"
        />
  )
}

function App() {
  return (
    <>
      <DateChooser />
    </>
  )
}

export default App
