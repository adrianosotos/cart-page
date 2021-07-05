import { render, screen, cleanup, waitFor } from '@testing-library/react';
import ProductCard from '../components/ProductCard'

const mockProduct = {
  imageSrc: 'http://codeby.vteximg.com.br/arquivos/ids/159959-800-1029/truffon-meio-amargo.png?v=636930938547630000',
  productName: 'Product one',
  oldPrice: 150,
  price: 100
}

it('Render all passed props on screen', () => {
  render(<ProductCard 
    imageSrc={mockProduct.imageSrc}
    productName={mockProduct.productName}
    oldPrice={mockProduct.oldPrice}
    price={mockProduct.price} 
  />)

  const image = screen.getAllByTestId('imageSrc')
  expect(image[0]).toHaveAttribute('src', mockProduct.imageSrc)

  const productName = screen.getByTestId('productName')
  expect(productName).toHaveTextContent(mockProduct.productName)

  const oldPrice = screen.getByTestId('oldPrice')
  expect(oldPrice).toHaveTextContent(mockProduct.oldPrice)

  const price = screen.getByTestId('price')
  expect(price).toHaveTextContent(mockProduct.price)
})