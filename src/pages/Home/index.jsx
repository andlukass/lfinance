import { useEffect } from "react";

import LastMovements from "./components/LastMovements";
import Patrimony from "./components/Patrimony";
import Summary from "./components/Summary";
import { useAuth } from "../../contexts/auth";
import { HomeContainer, ContentContainer } from "./styles";

export default function Home() {
	const auth = useAuth();

	useEffect(() => {
		if (auth.snapControl === false) {
			auth.getMovements();
			auth.getAccounts();
		}
	});

	return (
		<>
			<HomeContainer>
				<ContentContainer className="top">
					{/* <Patrimony /> */}
					<Summary />
				</ContentContainer>
				<ContentContainer className="last">
					<LastMovements />
				</ContentContainer>
			</HomeContainer>
		</>
	);
}
