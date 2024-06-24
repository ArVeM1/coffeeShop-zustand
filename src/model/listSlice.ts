import { StateCreator } from 'zustand';
import { CartActions, CartState, ListActions, ListState } from './storeTypes';
import { GetCoffeeListReqParams } from '../types/coffeeTypes';
import { BASE_URL } from '../api/CoreApi';
import axios from 'axios';

export const listSlice: StateCreator<
CartActions & CartState & ListActions & ListState,
[['zustand/devtools', never], ['zustand/persist', unknown]],
[['zustand/devtools', never], ['zustand/persist', unknown]],
ListActions & ListState
> = (set, get) => ({
	coffeeList: undefined,
	controller: undefined,
	params: {
		text: undefined,
	},
	setParams: newParams => {
		const { getCoffeeList, params } = get();
		set({ params: { ...params, ...newParams } }, false, 'setParams');
		getCoffeeList(params);
	},
	getCoffeeList: async (params?: GetCoffeeListReqParams) => {
		const { controller } = get();
		if (controller) {
			controller.abort();
		}

		const newController = new AbortController();
		set({ controller: newController }, false, `newController`);
		const { signal } = newController;
		try {
			const { data } = await axios.get(BASE_URL, { params, signal });
			set({ coffeeList: data }, false, `getCoffeeList ${params}`);
		} catch (e) {
			if (axios.isCancel(e)) return;
			console.error(e);
		}
	},
})