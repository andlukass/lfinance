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

export default function Buttons() {
  const btnSize = 30;

  return (
    <MasterContainerButtons>
      <ButtonsContainer>
        <Link to="/Movements" state={{ isExpense: false }}>
          <ButtonContainer>
            <p>
              Adicionar <br />
              Receita
            </p>
            <AiOutlinePlus size={btnSize} />
          </ButtonContainer>
        </Link>
        <Link to="/Movements" state={{ isExpense: true }}>
          <ButtonContainer>
            <p>
              Adicionar <br />
              Despesa
            </p>
            <AiOutlineMinus size={btnSize} />
          </ButtonContainer>
        </Link>
        <ButtonContainer className="disabled">
          <p>
            Ver <br />
            Carteira
          </p>
          <AiOutlineWallet size={btnSize} />
        </ButtonContainer>
        <ButtonContainer className="disabled">
          <p>
            Transferir <br />
            entre contas
          </p>
          <AiOutlineSwap size={btnSize} />
        </ButtonContainer>
        <ButtonContainer className="disabled">
          <p>
            Investir <br />
            patrimonio
          </p>
          <AiOutlineStock size={btnSize} />
        </ButtonContainer>
        <ButtonContainer className="disabled">
          <p>
            Editar <br />
            Saldo
          </p>
          <AiOutlineSetting size={btnSize} />
        </ButtonContainer>
      </ButtonsContainer>
    </MasterContainerButtons>
  );
}
