function ProductCard ({imageSrc, productName, oldPrice, price}) {
  return (
    <div className="product-card">
      <img data-testid="imageSrc" src={imageSrc} />
      <div className="product-details">
        <p data-testid="productName" className="product-name">{productName}</p>
        <p data-testid="oldPrice" className="old-price">{oldPrice}</p>
        <p data-testid="price" className="price">{price}</p>
      </div>
    </div>
  )
}

export default ProductCard