import { MasterContainer } from "../../../../services/styling/styles";

import MovementsList from "../../../../components/MovementsList";
import { useAuth } from "../../../../contexts/auth";

export default function LastMovements() {
  const auth = useAuth();

  return (
    <MasterContainer>
      <h2>Ultimas Movimentações</h2>
      <MovementsList movements={auth.movements} index={10} />
    </MasterContainer>
  );
}
