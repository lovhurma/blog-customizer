import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text'
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator'

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';

import {
	ArticleStateType,
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr
} from 'src/constants/articleProps'

import clsx from 'clsx';
import { Select } from 'src/ui/select';

//Создаю тип для пропсов состояния статьи
type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void
}

export const ArticleParamsForm = ({articleState, setArticleState}: ArticleParamsFormProps) => {

	//Состояние для отслеживания открытия/закрытия панели
	const [isOpen, setOpen] = useState<boolean>(false)
	//Сосотяние для формы и отслеживания изменения состояния ее элементов
	//Начальное состяние беру из пропса, переданного с общего состяния приложения
	//Состояние по дефолту
	const [stateForm, setStateForm] = useState(articleState)

	//Универсальная функция для изменения состояния формы
	//option - принимает название выбранной "кнопки", value - значение
	const onParamsFormSelected = (option: keyof ArticleStateType) => (value: OptionType): void => {
		setStateForm({
			...stateForm,
			[option]: value
		})
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				
				<form className={styles.form}>

					<Text size={31} weight={800} align={'center'} uppercase>Задайте параметры</Text>
					{/* Вопрос - почему в title я могу убрать {} и работает, в чем разница? */}

					<Select selected={stateForm.fontFamilyOption} options={fontFamilyOptions} onChange={onParamsFormSelected('fontFamilyOption')} title={'Шрифт'}/>

					<RadioGroup name={stateForm.fontSizeOption.className} selected={stateForm.fontSizeOption} options={fontSizeOptions} onChange={onParamsFormSelected('fontSizeOption')} title={'размер шрифта'}/>

					<Select selected={stateForm.fontColor} options={fontColors} onChange={onParamsFormSelected('fontColor')} title={'Цвет шрифта'}/>

					<Separator/>

					<Select selected={stateForm.backgroundColor} options={backgroundColors} onChange={onParamsFormSelected('backgroundColor')} title={'Цвет фона'}/>

					<Select selected={stateForm.contentWidth} options={contentWidthArr} onChange={onParamsFormSelected('contentWidth')} title={'Ширина контента'}/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
