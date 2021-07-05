import { render, screen, act, cleanup, waitFor } from '@testing-library/react';
import Cart from '../pages/Cart'
import axios from 'axios';

jest.mock('axios');
afterEach(cleanup)

const dataWithFreeDelivery = {
  "items": [
    { "id": "123", "name": "Product", "listPrice": 1050, sellingPrice: "1000" },
    { "id": "456","name": "Product", "listPrice": "140", sellingPrice: "90" }
  ],
  "totalizers": [{
    "id": "Items",
    "value": 1090
  }]
}

const dataWithoutFreeDelivery = {
  "items": [
    { "id": "123", "name": "Product", "listPrice": 150, sellingPrice: "100" },
    { "id": "456","name": "Product", "listPrice": "140", sellingPrice: "90" }
  ],
  "totalizers": [{
    "id": "Items",
    "value": 190
  }]
}


test('Render cart title', async () => {
  axios.get.mockResolvedValue({ data: dataWithFreeDelivery });
  render(<Cart apiPath={'frete-gratis'}/>)

  const title = await waitFor(() => screen.getByText('Meu carrinho'))

  await expect(title).toBeInTheDocument()
})

test('Render free delivery flag if totalizer value is greater than 1000', async () => {
  axios.get.mockResolvedValue({ data: dataWithFreeDelivery });
  render(<Cart apiPath={'frete-gratis'}/>)

  const flag = await waitFor(() => screen.getByTestId('free-delivery-flag'))

  expect(flag.textContent).toBe('Parabéns, sua compra tem frete grátis !')
})

test('Don\'t render free delivery flag if totalizer value is lesser than 1000', async () => {
  axios.get.mockResolvedValue({ data: dataWithoutFreeDelivery });
  render(<Cart apiPath={'sem-frete-gratis'}/>)

  const flag = await waitFor(() => screen.queryByTestId('free-delivery-flag'))

  expect(flag).not.toBeInTheDocument()
})

test('Print selected items returned from api on screen', async () => {
  axios.get.mockResolvedValue({ data: dataWithFreeDelivery });
  render(<Cart apiPath={'frete-gratis'}/>)

  const products = await waitFor(() => screen.getAllByText('Product'))

  expect(products.length).toEqual(dataWithFreeDelivery.items.length)
})

test('Renders finalize button on screen', async () => {
  axios.get.mockResolvedValue({ data: dataWithFreeDelivery });
  render(<Cart apiPath={'frete-gratis'}/>)

  const button = await waitFor(() => screen.getByText('Finalizar compra'))

  await expect(button).toBeInTheDocument()
})
