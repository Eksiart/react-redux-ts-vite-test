import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: ReactNode;
}

const Button = (props: ButtonProps) => {
	const { className, children, disabled, ...otherPops } = props;

	return (
		<button
			type='button'
			className={className}
			disabled={disabled}
			{...otherPops}
		>
			{children}
		</button>
	)
}

export default Button;
