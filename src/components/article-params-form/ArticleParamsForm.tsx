import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text'

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';

import clsx from 'clsx';

export const ArticleParamsForm = () => {

	//Состояние для отслеживания открытия/закрытия панели
	const [isOpen, setOpen] = useState<boolean>(false)
	//Сделала коммент - проверка гит

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<Text>Задайте параметры</Text>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
