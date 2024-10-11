// 'use client' //? se pudo hacer del lado del cliente

import { getCookie, hasCookie, setCookie } from 'cookies-next'

/***
  Cookie: cart

  {
    'uui-123-1': 4,
    'uui-123-2': 4,
    'uui-123-3': 4,
  }

*/

const cartKey = 'cart'

export const getCookieCart = (): { [id: string]: number } => {
	if (!hasCookie('cart')) return {}

	const cookieCart = JSON.parse((getCookie(cartKey) as string) ?? '{}')
	return cookieCart
}

export const addProductToCart = (id: string) => {
	const cookieCart = getCookieCart()
	cookieCart[id] = cookieCart[id] ? cookieCart[id] + 1 : 1
	setCookie(cartKey, JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = (id: string) => {
	const cookieCart = getCookieCart()

  if (cookieCart[id] > 1) {
    cookieCart[id] -= 1
  } else {
    delete cookieCart[id]
  }
  setCookie(cartKey, JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string) => {
	const cookieCart = getCookieCart()
  delete cookieCart[id]
  setCookie(cartKey, JSON.stringify(cookieCart))
}