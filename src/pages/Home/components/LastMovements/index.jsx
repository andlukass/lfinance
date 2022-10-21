import { MasterContainer } from "../../../../services/styling/styles";

import MovementsList from "../../../../components/MovementsList";
import { useAuth } from "../../../../contexts/auth";
import LoadingBox from "../../../../components/LoadingBox";

export default function LastMovements() {
  const auth = useAuth();

  return (
    <>
      <MasterContainer>
        <h2>Ultimas Movimentações</h2>
        {auth.snapControl === false ? (
          <>
            <LoadingBox count={3} customWidth={55} customColor={"#414444"} />
          </>
        ) : (
          <MovementsList movements={auth.movements} index={10} />
        )}
      </MasterContainer>
    </>
  );
}
