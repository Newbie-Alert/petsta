import React, { useEffect, useState } from 'react';
import { fetchData } from '../fireBase';
import EditorBox from './Editor';

// Main Comp
export default function WritePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await fetchData();
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <EditorBox></EditorBox>
    </div>
  );
}
