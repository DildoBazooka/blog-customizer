import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	type ArticleStateType,
	type OptionType,
} from 'src/constants/articleProps';

type Props = {
	articleState: ArticleStateType;
	onApply: (next: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, onApply }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	const rootRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleOutside = (e: MouseEvent) => {
			if (!isOpen) return;
			const target = e.target as Node | null;
			if (rootRef.current && target && !rootRef.current.contains(target)) {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleOutside);
		return () => window.removeEventListener('mousedown', handleOutside);
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) setFormState(articleState);
	}, [articleState, isOpen]);

	const handleApply = (e?: React.FormEvent) => {
		e?.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = (e?: React.MouseEvent) => {
		e?.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((s) => !s)} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={(e) => handleApply(e)}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option: OptionType) =>
							setFormState((s) => ({ ...s, fontFamilyOption: option }))
						}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option: OptionType) =>
							setFormState((s) => ({ ...s, fontSizeOption: option }))
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option: OptionType) =>
							setFormState((s) => ({ ...s, fontColor: option }))
						}
					/>

					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option: OptionType) =>
							setFormState((s) => ({ ...s, backgroundColor: option }))
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option: OptionType) =>
							setFormState((s) => ({ ...s, contentWidth: option }))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
