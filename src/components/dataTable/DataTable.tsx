import type { KoliBriTableCell, KoliBriTableDataType, KoliBriTableHeaders, KoliBriTableSelection } from '@public-ui/components';
import { KolEvent } from '@public-ui/components';
import type { FC } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { getRoot } from '../../shares/react-roots';
import { createReactRenderElement, KolButton, KolTableStateful, KolTableStateless } from '@public-ui/react';
import { Button } from '../Button';

type Data = {
	id: string;
	name: string;
	internalIdentifier: string;
	age: number;
};

const DATA: Data[] = [
	{ id: '1001', name: 'Foo Bar', internalIdentifier: `AAA1001`, age: 0 },
	{ id: '1002', name: 'Foo Baz', internalIdentifier: `AAA1002`, age: 1 },
	{ id: '1003', name: 'This row is always unchecked', internalIdentifier: `AAA1003`, age: 2 },
	{ id: '1004', name: 'This row is always checked', internalIdentifier: `AAA1004`, age: 3 },
];

// type Data = (typeof DATA)[0];

function KolButtonWrapper({ label }: { label: string }) {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return <KolButton _label={label} _on={dummyEventHandler} />;
}

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'City', key: 'city' },
			{
				label: 'Temperature (°C)',
				key: 'temperature',
				textAlign: 'right',
				compareFn: () => {},
				render: (_element, _cell, row) => {
					const difference = Math.abs((row as TemperatureRow).temperature - COMFORTABLE_TEMPERATURE);
					return `${(row as TemperatureRow).temperature} °C (Δ ${difference} °C)`;
				},
			},
		],
	],
};

export const DataTable = () => {
	const [selectedValue, setSelectedValue] = useState<Data[] | null>();

	const selection: KoliBriTableSelection = {
		label: (row) => `Selection for ${(row as Data).age}`,
		selectedKeys: selectedValue ? selectedValue.map((element) => element.age) : [],
		disabledKeys: [1, 2],
		keyPropertyName: 'age',
	};

	const kolTableStatefulRef = useRef<HTMLKolTableStatefulElement>(null);

	const handleSelectionChangeCallback = (_event: Event, selection: KoliBriTableDataType[] | KoliBriTableDataType | null) => {
		console.log('Selection change via callback', selection);
	};

	const handleButtonClick = async () => {
		const selection = await kolTableStatefulRef.current?.getSelection();
		setSelectedValue(selection as Data[] | null);
		console.log('selection:', selection);
	};

	const renderButton = (element: HTMLElement, cell: KoliBriTableCell) => {
		getRoot(createReactRenderElement(element)).render(<KolButtonWrapper label={`Click ${cell.data?.name}`} />);
	};

	const headers: KoliBriTableHeaders = {
		horizontal: [[]],
	};

	const onClickCallback = useCallback(() => {
		console.log('test Data');
	}, []);

	return (
		<>
			<section className="w-full">
				<Button label="Get Data" onClick={handleButtonClick} />
				<KolTableStateful
					_label="Table with selection checkboxes"
					_minWidth="auto"
					_headers={{
						horizontal: [
							[
								{ key: 'id', label: '#ID', textAlign: 'left' },
								{ key: 'name', label: 'Name', textAlign: 'right' },
								{ key: 'action', label: 'Action', textAlign: 'left', render: renderButton },
							],
						],
					}}
					_allowMultiSort
					_data={DATA}
					_selection={selection}
					_on={{ onSelectionChange: handleSelectionChangeCallback }}
					className="block"
					style={{ maxWidth: '600px' }}
					ref={kolTableStatefulRef}
				/>

				<div className="grid grid-cols-3 items-end gap-4 mt-4">
					<KolButton
						_label="getSelection()"
						_on={{
							onClick: () => {
								void handleButtonClick();
							},
						}}
					></KolButton>
					<pre className="text-base">{JSON.stringify(selectedValue, null, 2)}</pre>
				</div>
			</section>
		</>
	);
};
