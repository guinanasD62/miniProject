import React, { useState, useEffect } from 'react';

const MyComponent: React.FC = () => {
  const [resourceType, setResourceType] = useState('posts');
  const [items, setItems] = useState<any[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then(response => response.json())
      .then(json => setItems(json));

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resourceType]);

  return (
    <>
    <div>
        <h4> Window width: </h4>
        {windowWidth}
      </div>
      
      <div>
        <button onClick={() => setResourceType('posts')}>Posts</button>
        <button onClick={() => setResourceType('users')}>Users</button>
        <button onClick={() => setResourceType('comments')}>Comments</button>
      </div>
      <h1>{resourceType}</h1>
      {items.map(item => (
        <pre key={item.id}>{JSON.stringify(item, null, 2)}</pre>
      ))}
      
    </>
  );
}

export default MyComponent;
