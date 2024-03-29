import { useForm, SubmitHandler } from 'react-hook-form';
import TextInputComponent from '../component/TextInputComponent';
import NumberInputComponent from '../component/NumberInputComponent';
import SubmitInputComponent from '../component/SubmitInputComponent';

export type ProductInputTypes = {
	productName: string;
	productPrice: number;
};

export type AddProductFormLayoutPropTypes = {
	handleSubmitFunc: (arg: ProductInputTypes) => void;
	stateValue?: ProductInputTypes;
	stateFunc?: (arg: ProductInputTypes) => void;
};

function AddProductFormLayout({
	handleSubmitFunc,
	stateValue = undefined,
	stateFunc = undefined,
}: AddProductFormLayoutPropTypes) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProductInputTypes>();

	const onSubmit: SubmitHandler<ProductInputTypes> = (data) => {
		handleSubmitFunc(data);
	};

	return (
		<div className="m-5">
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextInputComponent
					register={register}
					displayText="Name"
					inputName="productName"
					validationConstrain={{ required: 'This field is required' }}
					errorMessage={errors.productName?.message?.toString()}
					stateValue={stateValue}
					onChangeHandler={stateFunc}
				/>

				<NumberInputComponent
					register={register}
					displayText="Price"
					inputName="productPrice"
					validationConstrain={{
						required: 'This field is required',
						min: { value: 1, message: 'Price needs to be more than 1' },
					}}
					stateValue={stateValue}
					onChangeHandler={stateFunc}
					errorMessage={errors.productPrice?.message?.toString()}
				/>

				<SubmitInputComponent displayText="Add Product" />
			</form>
		</div>
	);
}

export default AddProductFormLayout;
