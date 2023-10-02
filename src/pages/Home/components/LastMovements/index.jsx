import MovementsList from "../../../../components/MovementsList";
import { useAuth } from "../../../../contexts/auth";
import SkeletonComponent from "../../../../components/MultipleSkeletons";

export default function LastMovements() {
	const auth = useAuth();

	return (
		<>
				<h1>Ultimas Movimentações</h1>
				{auth.snapControl === false
				? <SkeletonComponent count={5} size={"65%"} margin={"11px"} />
				: <MovementsList movements={auth.movements} index={10} />
				}
		</>
	);
}
