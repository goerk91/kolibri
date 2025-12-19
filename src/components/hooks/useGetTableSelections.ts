import React, { useState } from 'react';
import { OptionalId } from '../interfaces.ts/OptionalId';

export const useGetTableSelections = <T extends OptionalId>(
	tableRef: React.RefObject<HTMLKolTableStatefulElement>,
	setValue: React.Dispatch<React.SetStateAction<T[] | null | undefined>>,
) => {
	const [selected, setSelected] = useState<T[] | null>(null);

	const getSelectionsCallback = async () => {
		const selection = await tableRef.current?.getSelection();
		setValue(selection as T[] | null);
	};
};
