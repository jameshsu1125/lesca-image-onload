import React, { useEffect, useRef } from 'react';
import { render } from 'react-dom';
import ImageOnloader from './../lib/index';
import './styles.less';
import img from './100x100.png';

const App = () => {
	const container = useRef(null);
	const LoadngBar = useRef(null);

	useEffect(() => {
		const { current: bar } = LoadngBar;
		new ImageOnloader(container.current, {
			onUpdate: (e) => {
				const { loaded, total } = e;
				const percent = (loaded / total) * 100;
				bar.style.width = `${percent}%`;
			},
			hideBeforeLoaded: true,
		}).then((e) => {
			bar.style.width = `100%`;
			bar.parentElement.style.display = 'none';
		});
	}, []);

	return (
		<>
			<div ref={container} className='container'>
				<div className='a'>
					<div className='a-1'>
						<img src={img} />
					</div>
					<div className='a-2'>
						<img src='' />
						<img />
					</div>
					<div className='a-3'></div>
				</div>
				<div className='b'>
					<div className='b-1'></div>
				</div>
				<div className='c' />
			</div>
			<div className='loading'>
				<div className='bar' ref={LoadngBar} />
			</div>
		</>
	);
};

render(<App />, document.getElementById('app'));
