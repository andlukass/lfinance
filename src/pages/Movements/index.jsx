import { useContext, useState, useEffect } from "react";

import {
  MasterContainer,
  BackGroundContainer,
  Buttons,
} from "../../services/styling/styles";

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
import { AuthContext } from "../../contexts/auth";

import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { moneyMask } from "../../components/Functions/moneyMask";

export default function Movements() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userEmail } = useContext(AuthContext);

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
  const [accounts, setAccounts] = useState([]);
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
  const userRef = doc(db, `users/${userEmail}`);
  const docRef = doc(
    db,
    "users",
    `${userEmail}`,
    "movements",
    `${location.state.id}`
  );

  useEffect(() => {
    getAccounts();
    dateFormat();
  });

  function dateFormat() {
    let diaHoje = ("0" + date.getDate()).slice(-2);
    let mesHoje = ("0" + (date.getMonth() + 1)).slice(-2);
    let anoHoje = date.getFullYear();
    let hoje = anoHoje + "-" + mesHoje + "-" + diaHoje;
    setDateForm(hoje);
  }

  async function getAccounts() {
    getDoc(userRef).then((snapshot) => {
      const data = Object.keys(snapshot.data());
      setAccounts(data);
    });
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
        //      CASO A CONTA SEJA IGUAL
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
          alert("movimentação alterada!  ;)");
          navigate("/home");
        } else {
          //     CASO SEJA CONTAS DIFERENTES
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
          alert("movimentação alterada!  ;)");
          navigate("/home");
        }
      } else {
        // ELSE FAZ FUNÇÃO BTN ADICIONAR
        setBtnCtrl(true);
        await addDoc(collection(db, `users/${userEmail}/movements`), docData);
        await getDoc(userRef).then((snapshot) => {
          const snap = snapshot.get(account);
          const calc = isExpense
            ? parseFloat(snap) - parseFloat(movementValue)
            : parseFloat(snap) + parseFloat(movementValue);
          updateDoc(userRef, {
            [account]: calc,
          });
        });
        alert("movimentação adicionada!  ;)");
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
    <>
      <Header />
      <BackGroundContainer>
        <MasterContainer>
          <h2>Descrição</h2>
          <input
            type="text"
            maxLength="25"
            placeholder={movementDesc ? movementDesc : "ex.: Mercado"}
            value={movementDesc}
            onChange={(e) => {
              setMovementDesc(e.target.value);
            }}
          />
          <p>Valor</p>
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
          <p>Em qual conta</p>
          <select
            value={account}
            onChange={(e) => {
              setAccount(e.target.value);
            }}
          >
            {accounts.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <p>Quando foi</p>
          <input
            type="date"
            id="start"
            name="date"
            min="2022-01-01"
            max="2025-12-31"
            value={dateForm}
            onChange={(e) => handleDate(e)}
          />
          <div>
            {" "}
            {location.state.id ? (
              <Buttons>
                <button className="addBtn" onClick={addToDb} disabled={btnCtrl}>
                  EDITAR
                </button>
              </Buttons>
            ) : (
              <Buttons>
                {" "}
                <button className="addBtn" onClick={addToDb} disabled={btnCtrl}>
                  ADICIONAR
                </button>
              </Buttons>
            )}
            {location.state.id ? (
              <div>
                <Buttons>
                  {" "}
                  <button
                    className="delBtn"
                    onClick={delFromDb}
                    disabled={btnCtrl}
                  >
                    APAGAR
                  </button>
                </Buttons>
              </div>
            ) : (
              <></>
            )}
          </div>
        </MasterContainer>
      </BackGroundContainer>
    </>
  );
}
