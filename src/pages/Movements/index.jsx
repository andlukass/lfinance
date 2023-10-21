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
	const today = new Date();
	const auth = useAuth();
	const location = useLocation();

	//valores padrão do form
	const [movementDesc, setMovementDesc] = useState();
	const [movementValue, setMovementValue] = useState();
	const [movementInputValue, setMovementInputValue] = useState();
	const [account, setAccount] = useState();
	const [movementDate, setMovementDate] = useState(today);
	const [btnCtrl, setBtnCtrl] = useState(false);
	const [isExpense, setIsExpense] = useState(false);
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
			setMovementValue(auth.movementEdit.value);
			setMovementDate(auth.movementEdit.date);
			setMovementInputValue(auth.movementEdit.value.toString().replace(".", ","));
			setAccount(auth.movementEdit.account);
		} else {
			setMovementId(0);
			setMovementDesc("");
			setMovementValue('');
			setMovementDate(today);
			setMovementInputValue('0,00');
			setAccount("dinheiro");
		}
	}, [auth.movementEdit]);

	//doc a ser salvo no BD
	const docData = {
		account: account,
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
		value: parseFloat(movementValue),
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
		//		CASO A CONTA SEJA IGUAL
		if (auth.movementEdit.account === account) {
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
				[auth.movementEdit.account]: isExpense
				? snap + parseFloat(auth.movementEdit.value)
				: snap - parseFloat(auth.movementEdit.value),
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
	setBtnCtrl(false);
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

	const handleDate = (e) => {
		if (typeof e === 'string') {
			setMovementDate(new Date(e));
		} else {
			setMovementDate(new Date(e.target.value));
		}
	}

	return (
		<>
			<MovementsBlackScreen 
				className={auth.movementsModalCtrl}
				onClick={()=>auth.handleMovementModal()} />
			<MovementsContainer className={auth.movementsModalCtrl}>
				{/* <p onClick={()=>{console.log(auth.movementEdit)}} >Teste</p> */}
				<DescriptionInput movementDesc={movementDesc}
						setMovementDesc={setMovementDesc} />
				<ValueInput movementInputValue={movementInputValue}
						changeValueInput={changeValueInput} />
				<AccountInput account={account}
						setAccount={setAccount}
						accounts={auth.accounts} />
				<DateInput movementDate={movementDate}
						handleDate={handleDate} />
				<ButtonContainer>
					<SubmitButton isNew={movementId} btnCtrl={btnCtrl} addToDb={addToDb} />
					<DeleteButton isNew={movementId} btnCtrl={btnCtrl} delFromDb={delFromDb} />
				</ButtonContainer>
			</MovementsContainer>
		</>
	);
}
