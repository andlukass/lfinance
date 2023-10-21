import { useState, useEffect } from "react";

import {
	collection,
	doc,
	updateDoc,
	addDoc,
	getDoc,
	Timestamp,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../contexts/auth";

import { useLocation } from "react-router-dom";
import { ButtonContainer, MovementsBlackScreen, MovementsContainer } from "./styles";
import SubmitButton from "./SubmitButton";
import DeleteButton from "./DeleteButton";
import DescriptionInput from "./DescriptionInput";
import ValueInput from "./ValueInput";
import AccountInput from "./AccountInput";
import DateInput from "./DateInput";

export default function Movements() {
	const today = new Date();
	const auth = useAuth();
	const location = useLocation();

	//valores padrão do form
	const [movementAccount, setMovementAccount] = useState();
	const [movementDate, setMovementDate] = useState(today);
	const [movementValue, setMovementValue] = useState();
	const [movementDesc, setMovementDesc] = useState();
	const [movementId, setMovementId] = useState(0);
	const [isExpense, setIsExpense] = useState(false);
	const [btnCtrl, setBtnCtrl] = useState(false);
	//doc para registro no DB
	const userRef = doc(db, `users/${auth.userEmail}`);
	const docRef = doc(
	db,
	"users",
	`${auth.userEmail}`,
	"movements",
	`${movementId}`
	);

	useEffect(() => {
		if (auth.movements.length === 0) {
			auth.getAccounts();
		}
		if (auth.movementEdit.isExpense === true) {
			setIsExpense(true);
		} else {
			setIsExpense(false);
		}
		if (auth.movementEdit.id) {
			setMovementId(auth.movementEdit.id);
			setMovementDesc(auth.movementEdit.desc);
			setMovementValue(auth.movementEdit.value.toFixed(2).toString());
			setMovementDate(auth.movementEdit.date);
			setMovementAccount(auth.movementEdit.account);
		} else {
			setMovementId(0);
			setMovementDesc("");
			setMovementValue('0,00');
			setMovementDate(today);
		}
	}, [auth.movementEdit]);

	//doc a ser salvo no BD
	const docData = {
		account: movementAccount,
		date: Timestamp.fromDate(
			new Date(
			movementDate.getFullYear(),
			movementDate.getMonth(),
			movementDate.getDate(),
			movementDate.getHours(),
			movementDate.getMinutes(),
			movementDate.getSeconds()
			)
		),
		description: movementDesc,
		isExpense: isExpense,
		value: parseFloat(movementValue.toString().replace(",", ".")),
	};

	async function addToDb() {
	console.log('pressionado')
	if (movementDesc === "") {
		alert("preencha a descrição :S");
	} else if (movementValue === "") {
		alert("preencha o valor :S");
	} else {
		setBtnCtrl(true);
		// IF FAZ FUNÇÃO BTN EDITAR
		if (movementId !== 0) {
		updateDoc(docRef, docData);
		alert("movimentação alterada!	;)");
		auth.handleMovementModal();
		} else {
		// ELSE FAZ FUNÇÃO BTN ADICIONAR
		setBtnCtrl(true);
		await addDoc(
			collection(db, `users/${auth.userEmail}/movements`),
			docData
		);
		alert("movimentação adicionada!	;)");
		auth.handleMovementModal();
		}
	}
	setBtnCtrl(false);
	}

	async function delFromDb() {
	setBtnCtrl(true);
	deleteDoc(docRef);
	alert("movimentação apagada!");
	auth.handleMovementModal();
	setBtnCtrl(false);
	}

	return (
		<>
			<MovementsBlackScreen 
				className={auth.movementsModalCtrl}
				onClick={()=>auth.handleMovementModal()} />
			<MovementsContainer className={auth.movementsModalCtrl}>
				<DescriptionInput movementDesc={movementDesc}
						setMovementDesc={setMovementDesc} />
				<ValueInput movementValue={movementValue}
						setMovementValue={setMovementValue} />
				<AccountInput account={movementAccount}
						setAccount={setMovementAccount}
						accounts={auth.accounts} />
				<DateInput movementDate={movementDate}
						setMovementDate={setMovementDate} />
				<ButtonContainer>
					<SubmitButton isNew={movementId} btnCtrl={btnCtrl} addToDb={addToDb} />
					<DeleteButton isNew={movementId} btnCtrl={btnCtrl} delFromDb={delFromDb} />
				</ButtonContainer>
			</MovementsContainer>
		</>
	);
}
