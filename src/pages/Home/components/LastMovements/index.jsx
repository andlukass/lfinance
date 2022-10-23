import { MasterContainer } from "../../../../services/styling/styles";

import MovementsList from "../../../../components/MovementsList";
import { useAuth } from "../../../../contexts/auth";
import SkeletonComponent from "../../../../components/MultipleSkeletons";

export default function LastMovements() {
  const auth = useAuth();

  return (
    <>
      <MasterContainer>
        <h2>Ultimas Movimentações</h2>
        {auth.snapControl === false ? (
          <>
            <SkeletonComponent count={5} size={"65%"} margin={"11px"} />
          </>
        ) : (
          <MovementsList movements={auth.movements} index={10} />
        )}
      </MasterContainer>
    </>
  );
}
