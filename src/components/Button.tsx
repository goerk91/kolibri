import { KolButton } from '@public-ui/react';
import React from 'react';

interface ButtonProps {
	label: string;
	onClick?: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
	return <KolButton _label={label} _on={{ onClick: onClick }} />;
};
