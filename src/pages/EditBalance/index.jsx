import {
  BackGroundContainer,
  MasterContainer,
  Buttons,
} from "../../services/styling/styles";

import { EditBalanceContainer } from "./styles";
import HeaderEditBalance from "../../components/Header/HeaderEditBalance";

import { useAuth } from "../../contexts/auth";

import { useContext, useState, useEffect } from "react";

import { BsPencilSquare, BsCheckLg, BsXSquareFill } from "react-icons/bs";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { onSnapshot, doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function EditBalance() {
  const auth = useAuth();

  const [accounts, setAccounts] = useState([]);

  const [accValue, setAccValue] = useState("");
  const [accName, setAccName] = useState("");
  const [isNewAcc, setIsNewAcc] = useState(false);

  const userRef = doc(db, `users/${auth.userEmail}`);

  useEffect(() => {
    getAccounts();
  }, []);

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
    });
  }

  async function updateAcc() {
    if (isNewAcc) {
      alert("conta adicionada!");
    } else {
      alert("saldo alerado!");
    }
    await updateDoc(userRef, { [accName]: parseFloat(accValue) });
    handleClose();
    setAccValue("");
    setAccName("");
  }

  async function deleteAcc(name) {
    alert("conta apagada!");
    await updateDoc(userRef, { [name]: deleteField() });
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
      <HeaderEditBalance />
      <BackGroundContainer>
        <MasterContainer>
          <EditBalanceContainer>
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                {isNewAcc ? (
                  <div>
                    <p>Nome da conta: </p>
                    <input
                      type="text"
                      value={accName}
                      onChange={(e) => setAccName(e.target.value)}
                    />
                    <p>Saldo da conta: </p>
                    <input
                      type="number"
                      value={accValue}
                      onChange={(e) => setAccValue(e.target.value)}
                    />
                    <p></p>
                    <BsCheckLg onClick={updateAcc} />
                  </div>
                ) : (
                  <div>
                    <p>Mudar o saldo de {accName} para: </p>
                    <input
                      type="number"
                      value={accValue}
                      onChange={(e) => setAccValue(e.target.value)}
                    />
                    <p></p>
                    <BsCheckLg onClick={updateAcc} />
                  </div>
                )}
              </Box>
            </Modal>

            {accounts.map((item, index) => (
              <div key={index} className="accContainer">
                <p>{item.name}</p>
                <p className="itemValue">{item.value}</p>
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
