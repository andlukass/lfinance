import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import TranslateDate from "../../../../components/Functions/TranslateDate";

export default function DateControl(props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <MdOutlineNavigateBefore
        size={45}
        color="#c9c7c7"
        onClick={() => {
          props.decMonth();
        }}
      />
      <p
        style={{
          marginTop: 12,
          marginBottom: 40,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <TranslateDate
          actualMonth={props.actualMonth}
          actualYear={props.actualYear}
        />
      </p>
      <MdOutlineNavigateNext
        size={45}
        color="#c9c7c7"
        onClick={() => {
          props.addMonth();
        }}
      />
    </div>
  );
}
