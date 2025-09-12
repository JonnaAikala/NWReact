import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

const ProductEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct}) => {

    // Komponentin tilan määritys

const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
        event.preventDefault()
        var newProduct = {
            productId: newProductId,
            productName: newProductName,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
        }

        ProductService.update(newProduct)
        .then(response => {
            if (response.status === 200) {
                setMessage("Edited Product: " + newProduct.productName)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                setShowMessage(false)
                }, 3000)

                setMuokkaustila(false)
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
      <div id="edit">
           <h2>Product Edit</h2>

           <form onSubmit={handleSubmit}>
            <div>
                <input type='text' value={newProductId} disabled/>
                </div>
                <div>
                <label>Product Name </label>
                <input type='text' value={newProductName} onChange={({target}) => setNewProductName(target.value)} required placeholder='Product Name'/>
                </div>
                <div>
                <label>Unit Price </label>
                <input type='number' value={newUnitPrice} onChange={({target}) => setNewUnitPrice(target.value)} placeholder='Unit Price'/>
                </div>
                <div>
                <label>Unit's in stock</label>
                <input type='number' value={newUnitsInStock} onChange={({target}) => setNewUnitsInStock(target.value)} placeholder='Units in stock'/>
                </div>

                <input type='submit' value='save' />
                <input type='button' value='back' onClick={() => setMuokkaustila(false)} />

           </form>

      </div>
  )
}

export default ProductEdit
