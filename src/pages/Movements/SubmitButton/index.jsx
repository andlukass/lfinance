export default function SubmitButton({isNew, btnCtrl, addToDb}) {
	if (!isNew) {
		return (
			<button className="addBtn" onClick={addToDb} disabled={btnCtrl}>
				APAGAR
			</button>
		);
	}
}