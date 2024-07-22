import React from 'react';
import { removeAllCityFromArray } from 'store/searchSlice';
// Styles
import s from './index.module.scss';
import { useAppDispatch } from 'hooks/useStore.ts';

type ModalProps = {
	handleOpenModalWindow: () => void;
};

export const ModalWindow: React.FC<ModalProps> = ({
	handleOpenModalWindow
}) => {
	const dispatch = useAppDispatch();

	const handleDeleteAllItems = (): void => {
		handleOpenModalWindow();
		dispatch(removeAllCityFromArray());
	};

	return (
		<div className={s.window}>
			<div className={s.window__container}>
				<p>Are you sure you want to delete all items?</p>
				<div className={s.window__container__btns}>
					<button
						className={s.window__container__cancel}
						onClick={handleOpenModalWindow}
					>
						cancel
					</button>
					<button
						className={s.window__container__delete}
						onClick={handleDeleteAllItems}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};
