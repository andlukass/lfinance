import { Link, useLocation } from "react-router-dom";
import { ListItem } from "./styles";
import { useAuth } from "../../contexts/auth";

export default function MovementsList(props) {
	const auth = useAuth();
	const location = useLocation();

	const index = props.index;

	return (
		<>
			{props.movements.length === 0 &&
			location.pathname !== "/month-movements" ? (
				<>
					<br />
					<h2>Sem movimentações</h2>
				</>
			) : (
				<>
					{props.movements
						.filter((item, idx) => idx < index)
						.map((item, index) => (
							<ListItem>
							<a
								key={index}
								to="/movements"
								className={item.isExpense ? "expense" : "receipt"}
								onClick={() => auth.handleMovementModal({
									id: item.id,
									value: item.value,
									desc: item.desc,
									account: item.account,
									date: item.date,
									isExpense: item.isExpense,
								})}
							>
								{item.type} {item.value.toString().replace(".", ",")} €{" "}
								{item.prep} {item.desc}, dia {item.date.getDate()}
							</a>
							</ListItem>
						))}
				</>
			)}
		</>
	);
}
