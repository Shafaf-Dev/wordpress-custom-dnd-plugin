import styled from 'styled-components';


const Inputs = styled.input`
    display: block;
    padding: 0.375rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    width: 53rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
`;

const color_field_styles = 'color_field_styles';
const date_field_style = 'date_field_style';
const radio_field_style = 'radio_field_style';
const select_field_style = 'select-field';

const Input = (props) => {
	var field_type = '';
	var field_type_select = '';
	var field_style = '';
	var placeholder = '';

	if(props.type === 'text'){
		field_type = props.type;
		placeholder = props.placeholder;

	}else if (props.type === 'radio'){
		field_type = props.type;
		field_style = radio_field_style;

	}else if (props.type === 'color'){
		field_type = props.type;
		field_style = color_field_styles;

	}else if (props.type === 'date'){
		field_type = props.type;
		field_style = date_field_style;

	}else if (props.type === 'number'){
		field_type = props.type;

	}else if (props.type === 'phone'){
		field_type = props.type;

	}else if (props.type === 'email'){
		field_type = props.type;

	}else if (props.type === 'select'){
		field_type_select = props.type;
		field_style = select_field_style;
	}else if (props.type === 'password'){
		field_type = props.type;
	}

	return(
		<>
			{field_type_select == 'select' ? '': <Inputs type={field_type} name={props.name} placeholder={placeholder} className={field_style} />}
			{field_type_select == 'select' ? <Select item={props.item} sty={field_style}/> : ''}
		</>
		)
}

const Select = (props) =>{
	return(
	<select className={props.sty}> 
		{props.item.option.map((opt, key)=> {
			return(
			<option key={key} value={opt}> {opt}</option>
			)
		})}
		
	</select>
	);
}
export default Input