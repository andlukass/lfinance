import { useContext } from "react";

import { MasterContainer } from "../../../../services/styling/styles";

import MovementsList from "../../../../components/MovementsList";
import { useAuth } from "../../../../contexts/auth";
import { Skeleton } from "@mui/material";

import { ThemeContext } from "styled-components";

import { shade } from "polished";

export default function LastMovements() {
  const auth = useAuth();

  const { colors } = useContext(ThemeContext);

  const SkeletonComponent = () => {
    let tempComponent = [];
    for (let i = 0; i < 5; i++) {
      tempComponent.push(
        <Skeleton
          key={i}
          style={{ marginTop: 13, marginBottom: 10 }}
          sx={{ bgcolor: `${shade(0.4, colors.primaryText)}` }}
          variant="rounded"
          width={"65%"}
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
