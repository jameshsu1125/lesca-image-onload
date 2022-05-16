import { Button, ButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import Code from '../components/code';
import { name } from '../config';

const codes = [
  {
    title: '1. Installation',
    code: `npm install ${name} --save`,
    type: 'text',
  },
  {
    title: '2. Installation',
    code: `import ImageOnload from '${name}';

const onload = new ImageOnload();
onload
  .load(containerRef.current, {
    hideBeforeLoaded: true,
    onUpdate: (e) => {
      const { loaded, total } = e;
      const percent = (loaded / total) * 100;
      
      console.log(percent); // 0~100
    },
  })
  .then((e) => {
    // all images loaded
  });`,
    type: 'js',
  },
];

const Usage = () => {
  useEffect(() => {}, []);
  return (
    <div className='Usage'>
      <h2>Usage</h2>
      {codes.map((e) => (
        <div key={e.title}>
          <h3>{e.title}</h3>
          <Code code={e.code} theme={e.type} />
        </div>
      ))}
    </div>
  );
};
export default Usage;
