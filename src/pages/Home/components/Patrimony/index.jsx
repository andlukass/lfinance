import { useState, useEffect, useContext } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { useAuth } from "../../../../contexts/auth";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../services/firebase";
import { Skeleton } from "@mui/material";

import { ThemeContext } from "styled-components";

export default function Patrimony() {
	const auth = useAuth();

	const { colors } = useContext(ThemeContext);

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
		<>
			{showValue ? (
				<>
					<p>
						Olá {auth.userName}, você tem <br />{" "}
						{auth.snapControl === false ? (
							<Skeleton
								style={{ marginTop: 2, marginBottom: -17 }}
								sx={{ bgcolor: `${colors.primaryText}` }}
								variant="rounded"
								width={"3vh"}
								height={15}
							/>
						) : (
							<span>{accBalance} </span>
						)}
						€ em suas contas
					</p>
					<AiOutlineEyeInvisible onClick={handleEyeClick} size={30} />
				</>
			) : (
				<>
					<p>
						Olá {auth.userName}, você tem <br /> ******* € em suas contas
					</p>
					<AiOutlineEye onClick={handleEyeClick} size={30} />
				</>
			)}
			</>
	);
}
