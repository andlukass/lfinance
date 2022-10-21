import { MasterContainer } from "../../../../services/styling/styles";

import MovementsList from "../../../../components/MovementsList";
import { useAuth } from "../../../../contexts/auth";
import { Skeleton } from "@mui/material";

export default function LastMovements() {
  const auth = useAuth();

  const SkeletonComponent = () => {
    let tempComponent = [];
    for (let i = 0; i < 5; i++) {
      tempComponent.push(
        <Skeleton
          key={i}
          style={{ marginTop: 13, marginBottom: 10 }}
          sx={{ bgcolor: "#aba9a9" }}
          variant="rounded"
          width={"60%"}
          height={15}
        />
      );
    }
    return tempComponent;
  };

  return (
    <>
      <MasterContainer>
        <h2>Ultimas Movimentações</h2>
        {auth.snapControl === false ? (
          <>
            <SkeletonComponent />
          </>
        ) : (
          <MovementsList movements={auth.movements} index={10} />
        )}
      </MasterContainer>
    </>
  );
}
