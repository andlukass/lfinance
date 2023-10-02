import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export const EyeIconComponent = (props) => {
	return (
		<>
			{props.showValue ? (
				<AiOutlineEye onClick={props.handleEyeClick} size={30} />
			) : (
				<AiOutlineEyeInvisible onClick={props.handleEyeClick} size={30} />
			)}
		</>
	);
}