import React, { useEffect, useState } from 'react';
import styles from '../../styles/WelcomeScreen/WelcomeScreen.module.scss';
import logo from '../../assets/logo.svg';

import axios from 'axios';
import { storeValues } from '../../shared/utils/utils';
import { useToggle } from '../../shared/customhooks';

const Popup = (props) => {
	const [ errors, setErrors ] = useState();
	const [ newTag, setNewTag ] = useState('');
	const [ selectedTags, setSelectedTags ] = useState([]);
	const [ tags, setTags ] = useState([]);
	const { toggle, switchUp, switchDown } = useToggle();

	useEffect(() => {
		async function getTags() {
			try {
				const url = `${process.env.REACT_APP_API}/getalltags`;
				const fetchTags = await axios.get(url);
				setTags(fetchTags.data['data']);
			} catch (err) {
				setErrors(err.response);
			}
		}
		getTags();
	}, []);

	const addAnotherTag = () => {
		async function addTag() {
			const newTags = [ ...tags, { tag: newTag } ];
			setTags(newTags);
			const url = `${process.env.REACT_APP_API}/createtag`;
			await axios.post(url, { data: newTag });
			switchDown();
		}
		addTag();
	};

	const createTag = (e) => {
		e.persist();
		if (e.key === 'Enter') {
			addAnotherTag();
		}
	};

	const handleRouter = () => {
		storeValues('tags', selectedTags);
	};

	const handleTag = (e) => {
		setNewTag(e.currentTarget.value);
	};

	const handleTags = (e) => {
		e.persist();
		if (e._targetInst.type === 'button') {
			const selectedValue = e.target.attributes['tag']['value'];
			if (selectedTags.includes(selectedValue)) {
				const newSelectedTags = [ ...selectedTags ];
				const index = newSelectedTags.indexOf(selectedValue);
				newSelectedTags.splice(index, 1);
				setSelectedTags(newSelectedTags);
			} else {
				setSelectedTags([ ...selectedTags, selectedValue ]);
			}
		}
	};

	return (
		<div className={styles.welcomeScreen}>
			<h3>{errors}</h3>
			<img src={logo} alt="logo" className={styles.welcomeLogo} />
			<p>Welcome to helpr, i can help you save time while learning</p>
			<h2>Choose the topics you want to learn</h2>
			<div className={styles.tags} onClick={handleTags}>
				{tags.map(({ tag }, index) => (
					<button
						key={index}
						className={`${styles.tag} ${selectedTags.includes(tag) ? styles.pressed : ''}`}
						tag={tag}
					>
						#{tag}
					</button>
				))}
				{toggle ? (
					<React.Fragment>
						<input type="text" onChange={handleTag} onKeyPress={createTag} />
						<button onClick={addAnotherTag} className={styles.addTopic}>
							+
						</button>
					</React.Fragment>
				) : (
					<button onClick={switchUp} tag="" className={styles.tag}>
						Add topic +
					</button>
				)}
			</div>

			<button className={styles.cta} onClick={handleRouter}>
				Let's go
			</button>
		</div>
	);
};

export default Popup;
