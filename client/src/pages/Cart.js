import { useEffect, useState } from 'react'
import Axios from 'axios'
import ProductCard from '../components/ProductCard'

function Cart ({ apiPath }) {
  const [items, setItems] = useState([])
  const [cartTotal, setCartTotal] = useState('')
  const [isFreeDelivery, setIsFreeDelivery] = useState(false)
  
  useEffect(() => {
    Axios.get(`http://localhost:5000/${apiPath}`).then((res) => {
      setItems(formatPrices(res.data.items))
      setCartTotal(getCartTotal(res.data.totalizers))
      setFreeDelivery(res.data.totalizers)
    })
  }, [isFreeDelivery, apiPath])

  function getCartTotal (totalizers) {
    return totalizers && totalizers.reduce((total, data) => {
      if (/Items/.test(data.id)) {
        total = priceFormatter(data.value)
      }

      return total
    }, 0)
  }

  function formatPrices (items) {
    return items && items.map(item => {
      item.listPrice = priceFormatter(item.listPrice)
      item.sellingPrice = priceFormatter(item.sellingPrice)

      return item
    })
  }

  function priceFormatter (price) {
    const value = (price / 100).toFixed(2).replace('.', ',')

    return `R$ ${value}`
  }

  function setFreeDelivery (totalizers) {
    const itemsTotalPayload = totalizers && totalizers.find((payload) => /Items/.test(payload.id))

    if (itemsTotalPayload && itemsTotalPayload.value > 1000) {
      setIsFreeDelivery(true)
    }
  }

  function handleFreeDeliveryFlag () {
    if (!isFreeDelivery) {
      return null
    }

    return (
      <div 
        className="free-delivery-flag"
        data-testid="free-delivery-flag"
      >
        Parabéns, sua compra tem frete grátis !
      </div>
    )
  }

  function getProductCards () {
    return items && items.map((item) => {
      return (
        <ProductCard 
          key={item.id}
          imageSrc={item.imageUrl}
          productName={item.name}
          oldPrice={item.listPrice}
          price={item.sellingPrice}
        />
      )
    })
  }
  
  return (
    <div className="cart-container">
      
      <div className="title-container">
        <h1>Meu carrinho</h1>
      </div>

      {getProductCards()}

      <div className="totalizer-container">
        <div className="totalizer-content">
          <div className="total">
            <div className="totalizer-label">Total</div>
            <div className="totalizer-price">{cartTotal}</div>
          </div>

          {handleFreeDeliveryFlag()}

        </div>
      </div>
      <div className="button-container">
        <button>Finalizar compra</button>
      </div>
    </div>
  )
}

export default Cart