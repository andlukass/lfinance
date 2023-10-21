export default function SubmitButton({ isNew, btnCtrl, addToDb }) {
	
	const buttonText = isNew ? "EDITAR" : "ADICIONAR";
	
	return (
		<button
			style={isNew ? {display: ''} : {marginTop: '30pt'}}
			className="addBtn"
			onClick={addToDb}
			disabled={btnCtrl}>
			{buttonText}
		</button>
	);
}
