'use client';

import React, { useRef } from 'react';
import { Field, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Form.module.css';

const Form = () => {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement | null>(null);

	const validationSchema = yup.object().shape({
		title: yup
			.string()
			.required('Заголовок обязательное поле')
			.min(2, 'Минимум 2 символа')
			.max(99, 'Максимум 99 символов'),
		text: yup.string().required('Текст обязательное поле'),
	});

	const cardHandler = async (
		values: {
			title: string;
			text: string;
		},
		actions: any
	) => {
		const method = 'POST';
		const path = '/api/card/create';
		const payload = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: values.title,
				text: values.text,
			}),
		};

		try {
			const response = await fetch(path, payload);

			if (response.ok) {
				toast.success('Card was created)');
				router.push('/');
				router.refresh();
			}
		} catch (error) {
			console.error('Faled: ', error);
		}
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: '',
			text: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			console.log(values);

			alert(JSON.stringify(values, null, 2));

			cardHandler(values, actions);
		},
	});

	return (
		<FormikProvider value={formik}>
			<form
				className={styles.form}
				ref={formRef}
				onSubmit={formik.handleSubmit}
			>
				<div className={styles.form__item}>
					<label htmlFor="title">Заголовок</label>
					<Field
						style={
							formik.touched.title && formik.errors.title
								? { borderColor: 'red' }
								: {}
						}
						id="title"
						name="title"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.title}
						error={
							formik.touched.title && Boolean(formik.errors.title).toString()
						}
						helpertext={formik.touched.title && formik.errors.title}
					/>
				</div>
				<div className={styles.form__item}>
					<label htmlFor="text">текст</label>
					<Field
						style={
							formik.touched.text && formik.errors.text
								? { borderColor: 'red' }
								: {}
						}
						id="text"
						name="text"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.text}
						error={
							formik.touched.text && Boolean(formik.errors.text).toString()
						}
						helpertext={formik.touched.text && formik.errors.text}
					/>
				</div>
				<button
					type="submit"
					className="bg-green-500 rounded py-2 px-3 capitalize transition hover:bg-green-600"
				>
					submit
				</button>
			</form>
			<ToastContainer
				position="top-center"
				hideProgressBar={true}
				theme={'light'}
				autoClose={2000}
			/>
		</FormikProvider>
	);
};

export default Form;
