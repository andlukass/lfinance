import { BiCommentDetail } from "react-icons/bi";
import { InputContainer } from "./styles";

export default function DescriptionInput({ movementDesc, setMovementDesc }) {
	return (
		<InputContainer>
			<BiCommentDetail size={20} />
			<input
			type="text"
			maxLength="25"
			placeholder={movementDesc ? movementDesc : "Descrição"}
			value={movementDesc}
			onChange={(e) => {
				setMovementDesc(e.target.value);
			}}/>
		</InputContainer>
	);
}