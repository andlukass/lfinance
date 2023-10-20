export default function DeleteButton({ isNew, btnCtrl, delFromDb }) {
	const buttonText = isNew ? "EDITAR" : "ADICIONAR";

	return (
		<button className="delBtn" onClick={delFromDb} disabled={btnCtrl}>
			{buttonText}
		</button>
	);
}