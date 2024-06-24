import { StateCreator } from 'zustand';
import { CartActions, CartState, ListActions, ListState } from './storeTypes';
import { CoffeeType, OrderCoffeeRes, OrderItem } from '../types/coffeeTypes';
import { BASE_URL } from '../api/CoreApi';
import axios from 'axios';

export const cartSlice: StateCreator<
	CartActions & CartState & ListActions & ListState,
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	CartActions & CartState
> = (set, get) => ({
	cart: undefined,
	address: undefined,
	addToCart: (item: CoffeeType) => {
		const { cart } = get();
		const { id, name, subTitle } = item;
		const prepearedItem: OrderItem = {
			id,
			name: `${name} ${subTitle}`,
			size: 'L',
			quantity: 1,
		};
		set({ cart: cart ? [...cart, prepearedItem] : [prepearedItem] });
	},
	clearCart: () => {
		set({ cart: undefined });
	},
	orderCoffee: async () => {
		const { cart, address, clearCart } = get();
		try {
			const { data } = await axios.post<OrderCoffeeRes>(BASE_URL + '/order', {
				address,
				orderItems: cart,
			});
			if (data.success) {
				alert(data.message);
				clearCart();
			}
		} catch (error) {
			console.log(error);
		}
	},
	setAddress: (address: string) => {
		set({ address });
	},
});
