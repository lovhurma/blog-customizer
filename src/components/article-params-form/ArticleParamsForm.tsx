import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text'
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator'

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState, useEffect, ReactNode } from 'react';

import {
	ArticleStateType,
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState
} from 'src/constants/articleProps'

import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

//Создаю тип для пропсов состояния статьи
type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void
}

export const ArticleParamsForm = ({ articleState, setArticleState }: ArticleParamsFormProps) => {

	//Состояние для отслеживания открытия/закрытия панели
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	//Сосотяние для формы и отслеживания изменения состояния ее элементов
	//Начальное состяние беру из пропса, переданного с общего состяния приложения
	//Состояние по дефолту
	const [stateForm, setStateForm] = useState(articleState);
	const formRef = useRef<HTMLDivElement>(null)

	// Эффект для обработки кликов вне формы (оставила для себя)
	// useEffect(() => {
	// if (!isOpen) return;
	// 	const handleClickOutside = (e: MouseEvent) =>{
	// 		//Если форма открыта и элемент по которому кликнули не находится в
	// 		// форме и сам не является формой, то меняю состояние (закрываю форму)
	// 		if(formRef.current && !formRef.current.contains(e.target as Node)) {
	// 			setIsMenuOpen(false)
	// 		}
	// 	};
	// 	//Добавляю обработчик клика
	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	//Удаляю обработчик при размонтировании компонента
	// 	return () =>{
	// 		document.removeEventListener('<mousedown></mousedown>', handleClickOutside)}

	// }, [])

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onClose: () => setIsMenuOpen(!isMenuOpen),
		onChange: setIsMenuOpen,
	})

	//Универсальная функция для изменения состояния формы
	//option - принимает название выбранной "кнопки", value - значение
	const SelectedParamsForm = (option: keyof ArticleStateType) => (value: OptionType): void => {
		setStateForm({
			...stateForm,
			[option]: value
		})
	}

	//Функция для отправки изменений статьи
	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(stateForm);
		setIsMenuOpen(false);
	}

	//Функия сброса параметров формы до дефолтного состояния
	const resetForm = (e: React.FormEvent) => {
		e.preventDefault();
		//Вопрос для консультации - почему такая логика не сработала?
		//    setStateForm(defaultArticleState);
		//    setArticleState(stateForm);
		setStateForm(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsMenuOpen(false);
	}

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
			<aside className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				{/* Вопрос для консультации - почему я вешаю слушатель на форму, а  на кнопку выкидывает ошибку? */}
				<form className={styles.form} onSubmit={submitForm} onReset={resetForm}>

					<Text size={31} weight={800} align={'center'} uppercase>Задайте параметры</Text>
					{/* Вопрос - почему в title я могу убрать {} и работает, в чем разница? */}

					<Select selected={stateForm.fontFamilyOption} options={fontFamilyOptions} onChange={SelectedParamsForm('fontFamilyOption')} title={'Шрифт'} />

					<RadioGroup name={stateForm.fontSizeOption.className} selected={stateForm.fontSizeOption} options={fontSizeOptions} onChange={SelectedParamsForm('fontSizeOption')} title={'размер шрифта'} />

					<Select selected={stateForm.fontColor} options={fontColors} onChange={SelectedParamsForm('fontColor')} title={'Цвет шрифта'} />

					<Separator />

					<Select selected={stateForm.backgroundColor} options={backgroundColors} onChange={SelectedParamsForm('backgroundColor')} title={'Цвет фона'} />

					<Select selected={stateForm.contentWidth} options={contentWidthArr} onChange={SelectedParamsForm('contentWidth')} title={'Ширина контента'} />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
