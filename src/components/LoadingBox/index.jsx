import { LoadingBoxStyle } from "./styles";

export default function LoadingBox(props) {
  const count = props.count;
  const customWidth = props.customWidth;
  const customColor = props.customColor;
  const LoadingBoxComponent = () => {
    let tempComponent = [];
    for (let i = 0; i < count; i++) {
      tempComponent.push(
        <LoadingBoxStyle
          key={i}
          style={{
            width: `${customWidth}vw`,
            backgroundColor: `${customColor}`,
          }}
        >
          ...........
        </LoadingBoxStyle>
      );
    }
    return tempComponent;
  };
  return (
    <>
      <LoadingBoxComponent />
    </>
  );
}
