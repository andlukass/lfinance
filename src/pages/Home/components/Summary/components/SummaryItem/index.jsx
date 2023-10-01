import { useContext } from "react";

import { useAuth } from "../../../../../../contexts/auth";

import {
	MonthTotalExpense,
	MonthTotalReceipt,
} from "../../../../../../components/Functions/MonthTotal";

import { Skeleton } from "@mui/material";

import { ThemeContext } from "styled-components";
import { MovementIcon, SummaryItemContainer } from "./styles";

export default function SummaryItem(props) {
	const auth = useAuth();

	const { colors } = useContext(ThemeContext);

	const date = props.date
		? props.date
		: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

	const themeColor = props.type === "receipt" ? colors.receipt : colors.expense;
	const message = props.type === "receipt" ? "Receitas" : "Despesas";
	const arrow = props.type === "receipt" ? "↑" : "↓";
	const MonthTotal = props.type === "receipt" ? MonthTotalReceipt : MonthTotalExpense;

	return (
			<SummaryItemContainer>
				<MovementIcon className={props.type}>
					<p>{arrow}</p>
				</MovementIcon>
				<div>
					<p id="title">{message}</p>
					{auth.snapControl === false
					? <Skeleton
						style={{ marginLeft: "1vw" }}
						sx={{ bgcolor: `${themeColor}` }}
						variant="rounded"
						width={"14vh"}
						height={15}/>
					: <p id="value" className={props.type}>
						<MonthTotal date={date} movements={auth.movements} />
						{" "}€
					</p>}
				</div>
			</SummaryItemContainer>
	);
}
