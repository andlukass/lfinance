export default function SubmitButton(props) {
	const buttonText = props.isNew ? "EDITAR" : "ADICIONAR";

	return (
		<button className="addBtn" onClick={addToDb} disabled={props.btnCtrl}>
			{buttonText}
		</button>
	);
}