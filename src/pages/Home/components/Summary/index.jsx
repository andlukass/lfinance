import TranslateDate from "../../../../components/Functions/TranslateDate";

import { Link } from "react-router-dom";
import { SummaryContainer } from "./styles";
import SummaryItem from "./components/SummaryItem";

export default function Summary() {

	return (
		<>
				{/* <Link to="/month-movements">
					<TranslateDate />
				</Link> */}
			<SummaryContainer>
				<SummaryItem type={"receipt"}/>
				<SummaryItem type={"expense"}/>
			</SummaryContainer>
		</>
	);
}
