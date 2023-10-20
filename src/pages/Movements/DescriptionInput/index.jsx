export default function DescriptionInput({ movementDesc, setMovementDesc }) {
	return (
		<>
			<h2>Descrição</h2>
			<input
			type="text"
			maxLength="25"
			placeholder={movementDesc ? movementDesc : "ex.: Mercado"}
			value={movementDesc}
			onChange={(e) => {
				setMovementDesc(e.target.value);
			}}/>
		</>
	);
}