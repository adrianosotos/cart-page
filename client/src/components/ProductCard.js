function ProductCard ({imageSrc, productName, oldPrice, price}) {
  return (
    <div className="product-card">
      <img src={imageSrc} />
      <div className="product-details">
        <p className="product-name">{productName}</p>
        <p className="old-price">{oldPrice}</p>
        <p className="price">{price}</p>
      </div>
    </div>
  )
}

export default ProductCard