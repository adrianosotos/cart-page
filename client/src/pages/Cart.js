import { useEffect, useState } from 'react'
import Axios from 'axios'
import ProductCard from '../components/ProductCard'

function Cart () {
  const [items, setItems] = useState([])
  const [cartTotal, setCartTotal] = useState('')
  const [isFreeDelivery, setIsFreeDelivery] = useState(false)
  
  useEffect(() => {
    const path = isFreeDelivery ? 'frete-gratis' : 'sem-frete-gratis'
    Axios.get(`http://localhost:5000/${path}`).then((res) => {
      console.log(res.data)

      setItems(formatPrices(res.data.items))
      setCartTotal(getCartTotal(res.data.totalizers))
      setFreeDelivery(res.data.totalizers)
    })
  }, [isFreeDelivery])

  function getCartTotal (totalizers) {
    return totalizers.reduce((total, data) => {
      if (/Items/.test(data.id)) {
        total = priceFormatter(data.value)
      }

      return total
    }, 0)
  }

  function formatPrices (items) {
    return items.map(item => {
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
    const itemsTotalPayload = totalizers.find((payload) => /Items/.test(payload.id))

    if (itemsTotalPayload.value > 1000) {
      setIsFreeDelivery(true)
    }
  }

  function toogleDeliveryMode () {
    setIsFreeDelivery(!isFreeDelivery)
  }
  
  return (
    <div className="cart-container">
      
      <div className="title-container">
        <h1>Meu carrinho</h1>
      </div>

      {
        items.map((item) => <ProductCard imageSrc={item.imageUrl} productName={item.name} oldPrice={item.listPrice} price={item.sellingPrice} />)
      }

      <div className="totalizer-container">
        <div className="totalizer-content">
          <div className="total">
            <div className="totalizer-label">Total</div>
            <div className="totalizer-price">{cartTotal}</div>
          </div>
          {
            isFreeDelivery ? 
              <div className="free-delivery-flag">Parabéns, sua compra tem frete grátis !</div>
              : null
          }
        </div>
      </div>
      <div className="button-container">
        <button onClick={toogleDeliveryMode}>Finalizar compra</button>
      </div>
    </div>
  )
}

export default Cart