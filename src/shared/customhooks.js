import { useState } from 'react';

export const useToggle = (initialValue = false) => {
	const [ toggle, setToggle ] = useState(initialValue);
	const switchUp = () => setToggle(true);
	const switchDown = () => setToggle(false);
	const switchOpposite = () => setToggle(!toggle);
	return { toggle, switchUp, switchDown, switchOpposite };
};
