import {
  BackGroundContainer,
  MasterContainer,
  Buttons,
} from "../../services/styling/styles";

import { EditBalanceContainer, AccContainer, IconsContainer } from "./styles";
import Header from "../../components/Header";

import { useAuth } from "../../contexts/auth";

import { useState, useEffect } from "react";

import { BsPencilSquare, BsCheckLg, BsXSquareFill } from "react-icons/bs";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { onSnapshot, doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../services/firebase";
import { moneyMask } from "../../components/Functions/moneyMask";

import { TailSpin } from "react-loading-icons";

export default function EditBalance() {
  const auth = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [loadControl, setLoadControl] = useState(false);

  const [accValue, setAccValue] = useState("");
  const [accInputValue, setAccInputValue] = useState("");
  const [accName, setAccName] = useState("");
  const [isNewAcc, setIsNewAcc] = useState(false);

  const userRef = doc(db, `users/${auth.userEmail}`);

  useEffect(() => {
    if (loadControl === false) {
      getAccounts();
    }
  });

  async function getAccounts() {
    onSnapshot(userRef, (snapshot) => {
      var tempAcc = [];
      const dataKeys = Object.keys(snapshot.data());
      const dataValues = Object.values(snapshot.data());
      for (let i = 0; i < dataValues.length; i++) {
        tempAcc.push({
          name: dataKeys[i],
          value: dataValues[i],
        });
      }
      tempAcc.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        return true;
      });
      setAccounts(tempAcc);
      setLoadControl(true);
    });
  }

  async function updateAcc() {
    if (accName === "") {
      alert("preencha o nome :S");
    } else if (accValue === "") {
      alert("preencha o valor :S");
    } else {
      if (accounts.map((e) => e.name).indexOf(accName) !== -1 && isNewAcc) {
        alert("você já tem uma conta com esse nome :S");
        return;
      } else if (isNewAcc) {
        alert("conta adicionada!");
      } else {
        alert("saldo alerado!");
      }
      await updateDoc(userRef, { [accName]: parseFloat(accValue) });
      handleClose();
    }
  }

  async function deleteAcc(name) {
    if (window.confirm("apagar essa conta?") === true) {
      alert("conta apagada!");
      await updateDoc(userRef, { [name]: deleteField() });
    }
  }

  function handleChange(name) {
    if (name) {
      handleOpen();
      setAccName(name);
    } else {
      setIsNewAcc(true);
      handleOpen();
    }
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsNewAcc(false);
    setAccValue("");
    setAccInputValue("");
    setAccName("");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    textAlign: "center",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Header />
      <BackGroundContainer>
        <MasterContainer>
          <EditBalanceContainer>
            {loadControl === false ? (
              <TailSpin heigth="100px" style={{ margin: "20px 30%" }} />
            ) : (
              <></>
            )}
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                {isNewAcc ? (
                  <div>
                    <p>Nome da conta: </p>
                    <input
                      type="text"
                      maxLength="25"
                      value={accName}
                      onChange={(e) => {
                        console.log(
                          accounts.map((e) => e.name).indexOf(accName) !== -1
                        );
                        setAccName(e.target.value);
                      }}
                    />
                    <p>Saldo da conta: </p>
                    <input
                      inputMode="numeric"
                      type="text"
                      maxLength="10"
                      value={accInputValue}
                      onChange={(e) => {
                        setAccInputValue(moneyMask(e.target.value));
                        setAccValue(
                          parseFloat(
                            moneyMask(e.target.value)
                              .replace(".", "")
                              .replace(",", ".")
                          )
                        );
                      }}
                    />
                    <p></p>
                    <BsCheckLg onClick={updateAcc} />
                  </div>
                ) : (
                  <div>
                    <p>Mudar o saldo de {accName} para: </p>
                    <input
                      inputMode="numeric"
                      type="text"
                      maxLength="10"
                      value={accInputValue}
                      onChange={(e) => {
                        setAccInputValue(moneyMask(e.target.value));
                        setAccValue(
                          parseFloat(
                            moneyMask(e.target.value)
                              .replace(".", "")
                              .replace(",", ".")
                          )
                        );
                      }}
                    />
                    <p></p>
                    <BsCheckLg onClick={updateAcc} />
                  </div>
                )}
              </Box>
            </Modal>

            {accounts.map((item, index) => (
              <div key={index}>
                <AccContainer>
                  <p>{item.name}</p>
                  <p className="itemValue">{item.value}</p>
                  <IconsContainer>
                    <BsPencilSquare
                      size={25}
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        handleChange(item.name);
                      }}
                    />
                    {item.name === "dinheiro" ? (
                      <></>
                    ) : (
                      <BsXSquareFill
                        size={22}
                        color="#ff8888"
                        onClick={() => {
                          deleteAcc(item.name);
                        }}
                      />
                    )}
                  </IconsContainer>
                </AccContainer>
              </div>
            ))}
            <Buttons>
              {" "}
              <button
                className="addBtn"
                onClick={() => {
                  handleChange();
                }}
              >
                Adicionar Conta
              </button>
            </Buttons>
          </EditBalanceContainer>
        </MasterContainer>
      </BackGroundContainer>
    </>
  );
}
