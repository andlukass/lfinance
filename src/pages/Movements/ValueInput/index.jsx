export default function ValueInput({ movementInputValue, changeValueInput }) {
	return (
		<>
			<h2>Valor</h2>
			<input
			inputMode="numeric"
			type="text"
			maxLength="10"
			placeholder={
				movementInputValue ? movementInputValue : "ex.: 8,14 €"
			}
			value={movementInputValue}
			onChange={changeValueInput}
			/>
		</>
	);
}