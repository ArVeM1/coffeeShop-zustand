import React from 'react';
import { Input } from 'antd';
import { getCoffeeList, setParams, useCoffeeStore } from '../model/coffeeStore';
import { useShallow } from 'zustand/react/shallow';
import { useUrlStorage } from '../helpers/useUrlStorage';

function SearchInput() {
	const [params] = useCoffeeStore(useShallow(state => [state.params]));

	React.useEffect(() => {
		getCoffeeList(params);
	}, []);

	useUrlStorage(params, setParams);

	return (
		<Input
			placeholder='Поиск'
			value={params.text}
			onChange={e => setParams({ text: e.target.value })}
		/>
	);
}

export default SearchInput;
