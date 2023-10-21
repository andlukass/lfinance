import { moneyMask } from "../../../components/Functions/moneyMask";
import { ValueInputContainer } from "./styles";

export default function ValueInput({ movementValue, setMovementValue }) {

	const getSize = () => {
		if (movementValue !== undefined)
			return `${movementValue.length*10}pt`;
	}

	const handleValue = (e) => {
		setMovementValue(moneyMask(e.target.value));
	}

	return (
		<ValueInputContainer>
			<label htmlFor="valueInput">Valor</label>
			<div>
				<input
				style={{width: getSize()}}
				id="valueInput"
				inputMode="numeric"
				type="text"
				maxLength="10"
				value={moneyMask(movementValue)}
				onChange={handleValue} />
				<label htmlFor="valueInput" className="euro"> € </label>
			</div>
		</ValueInputContainer>
	);
}