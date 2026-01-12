import { useEffect, useState } from "react";

const useInitialLoad = () => {
	const [initialLoad, setInitialLoad] = useState(false);

	useEffect(() => {
		const alreadyLoaded = sessionStorage.getItem("hasLoaded");

		if (!alreadyLoaded) {
			sessionStorage.setItem("hasLoaded", "true");
			setInitialLoad(true);

			const timer = setTimeout(() => {
				setInitialLoad(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, []);

	return initialLoad;
};

export default useInitialLoad;
