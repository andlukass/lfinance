import { DownContainer } from "../../../../services/styling/styles";
import TranslateDate from "../../../../components/Functions/TranslateDate";

import { Link } from "react-router-dom";

import SummaryResume from "./components/SummaryResume";

export default function Summary() {
  return (
    <>
      <DownContainer>
        <Link to="/month-movements">
          <TranslateDate />
        </Link>
        <SummaryResume />
      </DownContainer>
    </>
  );
}
