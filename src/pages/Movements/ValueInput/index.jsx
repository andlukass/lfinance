import { useEffect } from "react";
import { ValueInputContainer } from "./styles";
import { useState } from "react";

export default function ValueInput({ movementInputValue, changeValueInput }) {
	
	const [inputValueSize, setInputValueSize] = useState('');

	useEffect(() => {
		if (movementInputValue !== undefined) {
			if (movementInputValue.indexOf(',') === -1) {
				setInputValueSize(`${movementInputValue.length*12}pt`);
			} else {
				setInputValueSize(`${movementInputValue.length*10}pt`);
			}
		}
	}, [movementInputValue]);

	return (
		<ValueInputContainer>
			<label htmlFor="valueInput">Valor</label>
			<div>
				<input
				style={{width: inputValueSize}}
				id="valueInput"
				inputMode="numeric"
				type="text"
				maxLength="10"
				value={movementInputValue}
				onChange={changeValueInput}
				/>
				<label htmlFor="valueInput" className="euro"> € </label>
			</div>
		</ValueInputContainer>
	);
}