export default function DateInput({ dateForm, handleDate }) {
	return (
		<>
			<h2>Quando foi</h2>
			<input
			type="date"
			id="start"
			name="date"
			min="2022-01-01"
			max="2025-12-31"
			value={dateForm}
			onChange={(e) => handleDate(e)}
			/>
		</>
	);
}