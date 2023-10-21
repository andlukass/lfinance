import { BiCalendar } from "react-icons/bi";
import { DateInputContainer, DateOption } from "./styles";

export default function DateInput({ movementDate, handleDate }) {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	const dateToForm = (date) => {
		let year = date.getFullYear();
		let month = String(date.getMonth() + 1).padStart(2, '0');
		let day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	const handleClass = (option) => {
		if (option === 'today') {
			if ((dateToForm(movementDate) === dateToForm(today))){
				return 'selected';
			} else return '';
		} else if (option === 'yesterday') {
			if ((dateToForm(movementDate) === dateToForm(yesterday))){
				return 'selected';
			} else return '';
		} else if (option === 'other') {
			if ((dateToForm(movementDate) !== dateToForm(today)) 
				&& (dateToForm(movementDate) !== dateToForm(yesterday))){
				return 'selected';
			} else return '';
		}
	}

	return (
		<DateInputContainer>
			<BiCalendar size={20} />
			<DateOption
				className={handleClass('today')}
				onClick={() => {handleDate(today.toString())}}>
					<p>Hoje</p>
			</DateOption>
			<DateOption
				className={handleClass('yesterday')}
				onClick={() => {handleDate(yesterday.toString())}}>
					<p>Ontem</p>
			</DateOption>
			<input
			className={handleClass('other')}
			type="date"
			id="start"
			name="date"
			min="2022-01-01"
			max="2025-12-31"
			value={dateToForm(movementDate)}
			onChange={(e) => handleDate(e)}/>
		</DateInputContainer>
	);
}