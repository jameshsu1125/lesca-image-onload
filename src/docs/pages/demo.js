import { Button, ButtonGroup, Box, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import ImageOnload from '../../../lib/index';

const Demo = () => {
  const containerRef = useRef();
  const [state, setState] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    new ImageOnload()
      .load(containerRef.current, {
        hideBeforeLoaded: true,
        onUpdate: (e) => {
          const { loaded, total } = e;
          setState(Math.floor((loaded / total) * 100));
          setMessage((c) => JSON.stringify(e) + '\n' + c);
        },
      })
      .then((e) => {
        const { loaded, total } = e;
        setState(Math.floor((loaded / total) * 100));
        setMessage((c) => JSON.stringify(e) + '\n' + c);
      });
  }, []);

  return (
    <div className='Demo'>
      <h2>Demo</h2>

      <div className='container' ref={containerRef}>
        {[...new Array(0).keys()].map((e) => (
          <div key={e} />
        ))}
      </div>

      <pre>
        <code>{message}</code>
      </pre>

      <Box display='flex' alignItems='center' p={3}>
        <Box width='100%' mr={3}>
          <LinearProgress variant='determinate' value={state} />
        </Box>
        <Box minWidth={35}>
          <Typography variant='body2' color='textSecondary'>{`${Math.round(state)}%`}</Typography>
        </Box>
      </Box>
    </div>
  );
};
export default Demo;
