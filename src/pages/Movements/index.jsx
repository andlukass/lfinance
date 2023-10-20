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
import { moneyMask } from "../../components/Functions/moneyMask";
import { ButtonContainer, MovementsBlackScreen, MovementsContainer } from "./styles";
import SubmitButton from "./SubmitButton";
import DeleteButton from "./DeleteButton";
import DescriptionInput from "./DescriptionInput";
import ValueInput from "./ValueInput";
import AccountInput from "./AccountInput";
import DateInput from "./DateInput";

export default function Movements() {
	const auth = useAuth();
	const location = useLocation();

	//valores padrão do form
	const [movementDesc, setMovementDesc] = useState();
	const [movementValue, setMovementValue] = useState();
	const [movementInputValue, setMovementInputValue] = useState();
	const [account, setAccount] = useState();
	const [date, setDate] = useState(new Date());
	const [dateForm, setDateForm] = useState();
	const [btnCtrl, setBtnCtrl] = useState(false);
	const isExpense = location.state.isExpense;
	//doc a ser buscado no DB, para popular menu select
	const [movementId, setMovementId] = useState(0);
	const userRef = doc(db, `users/${auth.userEmail}`);
	const docRef = doc(
	db,
	"users",
	`${auth.userEmail}`,
	"movements",
	`${movementId}`
	);

	useEffect(() => {
		dateFormat();
			if (auth.movements.length === 0) {
				auth.getAccounts();
			}
		if (auth.movementEdit.id) {
			setMovementId(auth.movementEdit.id);
			setMovementDesc(auth.movementEdit.desc);
			setMovementValue(auth.movementEdit.value);
			setMovementInputValue(auth.movementEdit.value);
			setAccount(auth.movementEdit.account);
			setDate(new Date(auth.movementEdit.date));
			setDateForm(
			auth.movementEdit.date.getFullYear() +
				"-" +
				auth.movementEdit.date.getMonth() +
				"-" +
				auth.movementEdit.date.getDate()
			);
		} else {
			setMovementId(0);
			setMovementDesc("");
			setMovementValue("");
			setMovementInputValue("");
			setAccount("dinheiro");
			setDate(new Date());
			setDateForm(
			new Date().getFullYear() +
				"-" +
				new Date().getMonth() +
				"-" +
				new Date().getDate()
			);
		}
	}, [auth.movementEdit]);

	function dateFormat() {
		let diaHoje = ("0" + date.getDate()).slice(-2);
		let mesHoje = ("0" + (date.getMonth() + 1)).slice(-2);
		let anoHoje = date.getFullYear();
		let hoje = anoHoje + "-" + mesHoje + "-" + diaHoje;
		setDateForm(hoje);
	}

	function handleDate(e) {
		setDateForm(e.target.value);
		setDate(new Date(e.target.value));
		console.log(date);
		console.log(movementDesc + movementValue + account + date);
	}

	//doc a ser salvo no BD
	const docData = {
		account: account,
		date: Timestamp.fromDate(
			new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds()
			)
		),
		description: movementDesc,
		isExpense: isExpense,
		value: parseFloat(movementValue),
	};

	async function addToDb() {
	if (movementDesc === "") {
		alert("preencha a descrição :S");
	} else if (movementValue === "") {
		alert("preencha o valor :S");
	} else {
		setBtnCtrl(true);
		// IF FAZ FUNÇÃO BTN EDITAR
		if (location.state.id !== undefined) {
		updateDoc(docRef, docData);
		//		CASO A CONTA SEJA IGUAL
		if (location.state.account === account) {
			let oldValueFloat = parseFloat(location.state.value);
			let newValueFloat = parseFloat(movementValue);
			const calcExpense = oldValueFloat - newValueFloat;
			const calcReceipt = newValueFloat - oldValueFloat;
			await getDoc(userRef).then((snapshot) => {
			const snap = snapshot.get(account);
			updateDoc(userRef, {
				[account]: isExpense ? calcExpense + snap : calcReceipt + snap,
			});
			});
			alert("movimentação alterada!	;)");
			auth.handleMovementModal();
		} else {
			//	 CASO SEJA CONTAS DIFERENTES
			await getDoc(userRef).then((snapshot) => {
			const snap = snapshot.get(location.state.account);
			updateDoc(userRef, {
				[location.state.account]: isExpense
				? snap + parseFloat(location.state.value)
				: snap - parseFloat(location.state.value),
			});
			});
			await getDoc(userRef).then((snapshot) => {
			const snap = snapshot.get(account);
			updateDoc(userRef, {
				[account]: isExpense
				? snap - parseFloat(movementValue)
				: snap + parseFloat(movementValue),
			});
			});
			alert("movimentação alterada!	;)");
			auth.handleMovementModal();
		}
		} else {
		// ELSE FAZ FUNÇÃO BTN ADICIONAR
		setBtnCtrl(true);
		await addDoc(
			collection(db, `users/${auth.userEmail}/movements`),
			docData
		);
		await getDoc(userRef).then((snapshot) => {
			const snap = snapshot.get(account);
			const calc = isExpense
			? parseFloat(snap) - parseFloat(movementValue)
			: parseFloat(snap) + parseFloat(movementValue);
			updateDoc(userRef, {
			[account]: calc,
			});
		});
		alert("movimentação adicionada!	;)");
		auth.handleMovementModal();
		}
	}
	}

	async function delFromDb() {
	setBtnCtrl(true);
	deleteDoc(docRef);
	await getDoc(userRef).then((snapshot) => {
		const snap = snapshot.get(account);
		const calc = isExpense
		? parseFloat(snap) + parseFloat(movementValue)
		: parseFloat(snap) - parseFloat(movementValue);
		updateDoc(userRef, {
		[account]: calc,
		});
	});
	alert("movimentação apagada!");
	auth.handleMovementModal();
	}

	const changeValueInput = (e) => {
		setMovementInputValue(moneyMask(e.target.value));
		setMovementValue(
		parseFloat(
			moneyMask(e.target.value).replace(".", "").replace(",", ".")
		)
		);
	}

	return (
		<>
			<MovementsBlackScreen 
				className={auth.movementsModalCtrl}
				onClick={()=>auth.handleMovementModal()} />
			<MovementsContainer className={auth.movementsModalCtrl}>
				<DescriptionInput movementDesc={movementDesc}
						setMovementDesc={setMovementDesc} />
				<ValueInput movementInputValue={movementInputValue}
						changeValueInput={changeValueInput} />
				<AccountInput account={account}
						setAccount={setAccount}
						accounts={auth.accounts} />
				<DateInput dateForm={dateForm}
						handleDate={handleDate} />
				<ButtonContainer>
					<SubmitButton isNew={movementId} btnCtrl={btnCtrl} addToDb={addToDb} />
					<DeleteButton isNew={movementId} btnCtrl={btnCtrl} delFromDb={delFromDb} />
				</ButtonContainer>
			</MovementsContainer>
		</>
	);
}
