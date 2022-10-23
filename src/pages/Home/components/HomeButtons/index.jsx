import {
  ButtonsContainer,
  ButtonContainer,
  MasterContainerButtons,
} from "./styles";

import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineWallet,
  AiOutlineSwap,
  AiOutlineSetting,
} from "react-icons/ai";

import { Link } from "react-router-dom";

export default function HomeButtons() {
  const btnSize = 30;

  return (
    <MasterContainerButtons>
      <ButtonsContainer>
        <Link
          to="/movements"
          state={{ isExpense: false, title: "Adicionar Ganhos" }}
        >
          <ButtonContainer>
            <p>
              Adicionar <br />
              Ganhos
            </p>
            <AiOutlinePlus size={btnSize} />
          </ButtonContainer>
        </Link>
        <Link
          to="/movements"
          state={{ isExpense: true, title: "Adicionar Gastos" }}
        >
          <ButtonContainer>
            <p>
              Adicionar <br />
              Gastos
            </p>
            <AiOutlineMinus size={btnSize} />
          </ButtonContainer>
        </Link>
        <Link to="/edit-balance" state={{ title: "Editar Saldos" }}>
          <ButtonContainer>
            <p>
              Editar <br />
              Saldo
            </p>
            <AiOutlineSetting size={btnSize} />
          </ButtonContainer>
        </Link>
      </ButtonsContainer>
      <ButtonsContainer>
        <ButtonContainer
          className="disabled space"
          onClick={() => {
            alert("feature coming soon c:");
          }}
        >
          <p>
            Transferir <br />
            entre contas
          </p>
          <AiOutlineSwap size={btnSize} />
        </ButtonContainer>
        <ButtonContainer
          className="disabled"
          onClick={() => {
            alert("feature coming soon c:");
          }}
        >
          <p>
            Ver <br />
            Carteira
          </p>
          <AiOutlineWallet size={btnSize} />
        </ButtonContainer>
      </ButtonsContainer>
    </MasterContainerButtons>
  );
}
