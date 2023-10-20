export default function SubmitButton({ isNew, btnCtrl, addToDb }) {
	
	const buttonText = isNew ? "EDITAR" : "ADICIONAR";
	
	return (
		<button className="addBtn" onClick={addToDb} disabled={btnCtrl}>
			{buttonText}
		</button>
	);
}
