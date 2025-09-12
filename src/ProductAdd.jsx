import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

// Propsi otettu vastaan suoraan nimellä
const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    // Komponentin tilan määritys

const [newProductName, setNewProductName] = useState('')
const [newUnitPrice, setNewUnitPrice] = useState('')
const [newUnitsInStock, setNewUnitsInStock] = useState('')
const [newDiscontinued, setNewDiscontinued] = useState(false)

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
        event.preventDefault()
        var newProduct = {
            productName: newProductName,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            discontinued: newDiscontinued
        }

        const token = localStorage.getItem('token')
            ProductService
                .setToken(token)
                
        ProductService.create(newProduct)
        .then(response => {
            if (response.status === 200) {
                setMessage("Added new Product: " + newProduct.productName)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                 setShowMessage(false)
                }, 3000)

                setLisäystila(false)
            }
        })
        .catch(error => {
            setMessage(error)
            setIsPositive(false)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
                }, 3000)

        })
}

  return (
      <div id="addNew">
           <h2>Product add</h2>

           <form onSubmit={handleSubmit}>
                <div>
                <input type='text' value={newProductName} onChange={({target}) => setNewProductName(target.value)} required placeholder='Product Name'/>
                </div>
                <div>
                <input type='number' value={newUnitPrice} onChange={({target}) => setNewUnitPrice(target.value)} placeholder='Unit Price'/>
                </div>
                <div>
                <input type='number' value={newUnitsInStock} onChange={({target}) => setNewUnitsInStock(target.value)} placeholder='Units in stock'/>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={newDiscontinued}
                            onChange={({ target }) => setNewDiscontinued(target.checked)}
                         /> Discontinued
                    </label>
                </div>
                <input type='submit' value='save' />
                <input type='button' value='back' onClick={() => setLisäystila(false)} />

           </form>

      </div>
  )
}

export default ProductAdd
