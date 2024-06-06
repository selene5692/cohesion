import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { thumbsUpOutline, thumbsUp } from 'ionicons/icons';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const ThumbsUpButton = ({ id, initialLikes }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function getPost(id) {
    try {
      const postDocument = await getDoc(doc(db, "posts", id));
      if (postDocument.exists()) {
        const post = postDocument.data();
        setLikes(post.likes);
      }
    } catch (error) {
      console.error("Error fetching post: ", error);
    }
  }

  async function toggleLikePost() {
    const postRef = doc(db, "posts", id);

    try {
      if (isPressed) {
        await updateDoc(postRef, {
          likes: increment(-1)
        });
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        await updateDoc(postRef, {
          likes: increment(1)
        });
        setLikes((prevLikes) => prevLikes + 1);
      }
      setIsPressed(!isPressed);
    } catch (error) {
      console.error("Error updating like count: ", error);
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);

  return (
    <div style={styles.buttonContainer} onClick={toggleLikePost}>
      <span style={styles.placeholder}>{likes}</span>
      <IonIcon icon={isPressed ? thumbsUp : thumbsUpOutline} size={24} color="green" />
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
  },
  placeholder: {
    marginRight: '8px',
    fontSize: '14px',
  },
};

export default ThumbsUpButton;
