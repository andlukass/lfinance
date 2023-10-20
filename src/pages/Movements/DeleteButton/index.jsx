export default function DeleteButton({ isNew, btnCtrl, delFromDb }) {
	if (isNew) {
		return (
			<button className="delBtn" onClick={delFromDb} disabled={btnCtrl}>
				APAGAR
			</button>
		);
	}
}