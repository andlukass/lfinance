import { useState, useEffect } from "react";

import { useAuth } from "../../../../contexts/auth";

import { MonthTotalBalance } from "../../../../components/Functions/MonthTotal";
import {
	DashBoardContainer,
	BalanceContainer,
	SummaryContainer,
	ValueContainer,
} from "./styles";
import SkeletonComponent from "../../../../components/MultipleSkeletons";
import SummaryItem from "../../../Home/components/Summary/components/SummaryItem";

export default function DashBoard(props) {
	const auth = useAuth();

	const [balanceStyle, setBalanceStyle] = useState();

	function getBalanceStyle() {
		let total = MonthTotalBalance({
			date: props.date,
			movements: auth.movements,
		});
		total = parseFloat(total);
		if (total < 0) {
			setBalanceStyle("expense");
		} else {
			setBalanceStyle("receipt");
		}
	}

	useEffect(() => {
		getBalanceStyle();
	});

	return (
		<>
			<DashBoardContainer>
				<BalanceContainer>
					<p>
					<br />	Saldo <br />
					</p>
					{auth.snapControl === false ? (
						<div style={{ marginTop: 33 }}>
							<SkeletonComponent count={3} size={"65px"} margin={"2px"} />
						</div>
					) : (
						<ValueContainer>
							<p className={balanceStyle}>
								saldo do <br />
								mês
								<br />
								<MonthTotalBalance
									date={props.date}
									movements={auth.movements}
								/>{" "}
								€
							</p>
						</ValueContainer>
					)}
				</BalanceContainer>
				<SummaryContainer>
					<p>
						resumo do <br /> mês
					</p>
					<ValueContainer>
						<SummaryItem type={"receipt"} date={props.date}/>
						<SummaryItem type={"expense"} date={props.date}/>
					</ValueContainer>
				</SummaryContainer>
			</DashBoardContainer>
		</>
	);
}
