import { Skeleton } from "@mui/material";
import { shade } from "polished";
import { useContext } from "react";

import { ThemeContext } from "styled-components";

export default function SkeletonComponent(props) {
  const { colors } = useContext(ThemeContext);
  let size = props.size;
  let count = props.count;
  let margin = props.margin;
  let tempComponent = [];
  for (let i = 0; i < count; i++) {
    tempComponent.push(
      <Skeleton
        key={i}
        style={{ marginTop: `${margin}`, marginBottom: `${margin}` }}
        sx={{ bgcolor: `${shade(0.4, colors.primaryText)}` }}
        variant="rounded"
        width={size}
        height={15}
      />
    );
  }
  return tempComponent;
}
