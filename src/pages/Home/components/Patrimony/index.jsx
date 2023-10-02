import { useState, useEffect } from "react";

import { useAuth } from "../../../../contexts/auth";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../services/firebase";

import { EyeIconComponent } from "./EyeIconComponent";
import { BalanceComponent } from "./BalanceComponent";
import { PatrimonyContainer } from "./styles";

export default function Patrimony() {
	const auth = useAuth();

	const [showValue, setShowValue] = useState(false);
	const [accBalance, setAccBalance] = useState(0);

	const userRef = doc(db, `users/${auth.userEmail}`);

	useEffect(() => {
		if (auth.userEmail) {
			balance();
		}
	});

	async function balance() {
		onSnapshot(userRef, (doc) => {
			if (doc.data() !== undefined) {
				const values = Object.values(doc.data());
				const total = values.reduce((prev, curr) => prev + curr, 0);
				setAccBalance(parseFloat(total).toFixed(2).replace(".", ","));
			} else {
				setAccBalance(0);
			}
		});
	}

	const handleEyeClick = () => {
		setShowValue(!showValue);
	}

	return (
	<PatrimonyContainer>
		<p>
			Olá {auth.userName}, você tem <br />{" "}
			<BalanceComponent 
			snapControl={auth.snapControl}
			balance={showValue?accBalance:"*******"}/>
			€ em suas contas
		</p>
		<EyeIconComponent showValue={showValue} handleEyeClick={handleEyeClick} />
	</PatrimonyContainer>
	);
}
