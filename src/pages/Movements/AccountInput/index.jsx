import { BiWallet } from "react-icons/bi";
import { AccountInputContainer } from "./styles";

export default function AccountInput({ account, setAccount, accounts }) {
	return (
		<AccountInputContainer>
			<BiWallet size={20} />
			<select
			value={account}
			onChange={(e) => {
				setAccount(e.target.value);
			}}>
			{accounts.map((item, index) => (
				<option key={index} value={item}>
				{item}
				</option>
			))}
			</select>
		</AccountInputContainer>
	);
}