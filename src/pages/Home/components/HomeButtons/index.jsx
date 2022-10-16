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
  AiOutlineStock,
  AiOutlineSetting,
} from "react-icons/ai";

import { Link } from "react-router-dom";

export default function HomeButtons() {
  const btnSize = 30;

  return (
    <MasterContainerButtons>
      <ButtonsContainer>
        <Link
          to="/Movements"
          state={{ isExpense: false, title: "Adicionar Receita" }}
        >
          <ButtonContainer>
            <p>
              Adicionar <br />
              Receita
            </p>
            <AiOutlinePlus size={btnSize} />
          </ButtonContainer>
        </Link>
        <Link
          to="/Movements"
          state={{ isExpense: true, title: "Adicionar Despesa" }}
        >
          <ButtonContainer>
            <p>
              Adicionar <br />
              Despesa
            </p>
            <AiOutlineMinus size={btnSize} />
          </ButtonContainer>
        </Link>
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
        <ButtonContainer
          className="disabled"
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
          onClick={() => {
            alert("feature coming soon c:");
          }}
          className="disabled"
        >
          <p>
            Investir <br />
            patrimonio
          </p>
          <AiOutlineStock size={btnSize} />
        </ButtonContainer>
        <Link to="/editBalance" state={{ title: "Editar Saldos" }}>
          <ButtonContainer>
            <p>
              Editar <br />
              Saldo
            </p>
            <AiOutlineSetting size={btnSize} />
          </ButtonContainer>
        </Link>
      </ButtonsContainer>
    </MasterContainerButtons>
  );
}
