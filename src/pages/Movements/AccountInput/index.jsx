export default function AccountInput({ account, setAccount, accounts }) {
	return (
		<>
			<h2>Em qual conta</h2>
			<select
			value={account}
			onChange={(e) => {
				setAccount(e.target.value);
			}}
			>
			{accounts.map((item, index) => (
				<option key={index} value={item}>
				{item}
				</option>
			))}
			</select>
		</>
	);
}