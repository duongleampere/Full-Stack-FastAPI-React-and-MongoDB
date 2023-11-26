import Layout from "../components/Layout"
import Card from "../components/Card"
import { useState, useEffect } from "react"

let BASE_URL = "http://localhost:8000/cars/"

const Cars = () => {
  const [cars, setCars] = useState([])
  const [brand, setBrand] = useState('')
  const [isPending, setIsPending] = useState(true)

  const handleChangeBrand = (ev) => {
    setCars([])
    setBrand(ev.target.value)
    setIsPending(true)
  }

  useEffect(()=>{
    fetch(`${BASE_URL}?brand=${brand}`)
      .then(response=>response.json())
      .then(json=>{
        setCars(json)
        setIsPending(false)
      })
  },[brand])

  return (
    <Layout>
      <h2>Cars - {brand?brand:"all brands"}</h2>
      <div>
        <label htmlFor="cars">Choose a brand: </label>
          <select name="cars" id="cars" onChange={handleChangeBrand}>
              <option value="Kiaa">Kiaa</option>
              <option value="Opel">Opel</option>
              <option value="Hello">Hello</option>
            </select>
      </div>
      <div>
        {isPending && <div>
          <h2>Loading cars, brand:{brand}...</h2>
          </div>}
          <div>
            {cars && cars.map(
              (el)=>{
                return (<Card key={el._id} car = {el} />
                )
              }
            )}
      </div>
    </div>
    </Layout>
  )
}

export default Cars