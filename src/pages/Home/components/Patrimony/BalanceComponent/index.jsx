import { Skeleton } from "@mui/material";
import { ThemeContext } from "styled-components";
import { useContext } from "react";

export const BalanceComponent = (props) => {
	const { colors } = useContext(ThemeContext);

	const spaces = Array.from({ length: 25 }, (index) => (
		<span key={index}>&nbsp;</span>
	));

	return (
		<>
				{props.snapControl === false ? (
					<span>
					<Skeleton
						style={{ marginTop: 2, marginBottom: -17 }}
						sx={{ bgcolor: `${colors.primaryText}` }}
						variant="rounded"
						width={"60px"}
						height={15}
					/>{spaces}</span>
				) : (
					<span>{props.balance}</span>
				)}
		</>
	);
}