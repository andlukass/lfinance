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

import { useLocation, useNavigate } from "react-router-dom";
import { moneyMask } from "../../components/Functions/moneyMask";
import { ButtonContainer, MovementsContainer } from "./styles";
import SubmitButton from "./SubmitButton";
import DeleteButton from "./DeleteButton";

export default function Movements() {
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	//valores padrão do form
	const [movementDesc, setMovementDesc] = useState(
	location.state.id ? location.state.desc : ""
	);
	const [movementValue, setMovementValue] = useState(
	location.state.id ? location.state.value : ""
	);
	const [movementInputValue, setMovementInputValue] = useState(
	location.state.id ? location.state.value : ""
	);
	const [account, setAccount] = useState(
	location.state.id ? location.state.account : "dinheiro"
	);
	const [date, setDate] = useState(
	location.state.id ? new Date(location.state.date) : new Date()
	);
	const [dateForm, setDateForm] = useState(
	date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
	);
	const [btnCtrl, setBtnCtrl] = useState(false);
	const isExpense = location.state.isExpense;
	//doc a ser buscado no DB, para popular menu select
	const userRef = doc(db, `users/${auth.userEmail}`);
	const docRef = doc(
	db,
	"users",
	`${auth.userEmail}`,
	"movements",
	`${location.state.id}`
	);

	useEffect(() => {
	dateFormat();
	if (auth.movements.length === 0) {
		auth.getAccounts();
	}
	});

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
			navigate("/home");
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
			navigate("/home");
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
		navigate("/home");
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
	navigate("/home");
	}

	return (
		<MovementsContainer>

			<h2>Descrição</h2>
		<input
			type="text"
			maxLength="25"
			placeholder={movementDesc ? movementDesc : "ex.: Mercado"}
			value={movementDesc}
			onChange={(e) => {
				setMovementDesc(e.target.value);
			}}/>
			<h2>Valor</h2>
			<input
			inputMode="numeric"
			type="text"
			maxLength="10"
			placeholder={
				movementInputValue ? movementInputValue : "ex.: 8,14 €"
			}
			value={movementInputValue}
			onChange={(e) => {
				setMovementInputValue(moneyMask(e.target.value));
				setMovementValue(
				parseFloat(
					moneyMask(e.target.value).replace(".", "").replace(",", ".")
				)
				);
			}}
			/>
			<h2>Em qual conta</h2>
		<select
			value={account}
			onChange={(e) => {
				setAccount(e.target.value);
			}}
			>
			{auth.accounts.map((item, index) => (
				<option key={index} value={item}>
				{item}
				</option>
			))}
			</select>
			<h2>Quando foi</h2>
			<input
			type="date"
			id="start"
			name="date"
			min="2022-01-01"
			max="2025-12-31"
			value={dateForm}
			onChange={(e) => handleDate(e)}
			/>
			<ButtonContainer>
				<SubmitButton isNew={location.state.id} btnCtrl={btnCtrl} addToDb={addToDb} />
				<DeleteButton isNew={location.state.id} btnCtrl={btnCtrl} delFromDb={delFromDb} />
			</ButtonContainer>
			</MovementsContainer>
	);
}
