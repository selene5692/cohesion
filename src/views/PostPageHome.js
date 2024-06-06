import { useEffect, useState } from "react";
import { Card, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navigation from "../components/Navigation";
import ThumbsUpButton from "../components/ThumbsUpButton";
import './PostPageHome.css';

export default function PostPageHome() {
  const [topPost, setTopPost] = useState(null);
  const [remainingPosts, setRemainingPosts] = useState([]);

  async function getAllPosts() {
    const query = await getDocs(collection(db, "posts"));
    const posts = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    if (posts.length > 0) {
      posts.sort((a, b) => b.likes - a.likes); // Sort posts by likes in descending order
      setTopPost(posts[0]); // Set the post with the most likes
      setRemainingPosts(posts.slice(1)); // Set the remaining posts
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const RemainingPostsRow = () => {
    return remainingPosts.map((post, index) => <ImageSquare key={index} post={post} />);
  };

  return (
    <>
      <Navigation />
      <Container fluid>
        <h1 className="text-center my-3">Top Voted Activity:</h1>
        <Row className="justify-content-center my-3">
          {topPost && <ImageSquare post={topPost} isTop />}
        </Row>
        <Row className="horizontal-scroll">
          <RemainingPostsRow />
        </Row>
      </Container>
    </>
  );
}

function ImageSquare({ post, isTop }) {
  const { activity, image, id, likes } = post;

  return (
    <Card style={{ width: isTop ? "24rem" : "12rem", margin: "1rem" }}>
      <Link
        to={`post/${id}`}
        style={{
          width: "100%",
          display: "inline-block",
          marginLeft: "2px",
          marginTop: "1rem",
        }}
      >
        <Image
          src={image}
          style={{
            objectFit: "cover",
            width: "100%",
            height: isTop ? "24rem" : "12rem",
            borderRadius: "2px",
          }}
        />
      </Link>
      <p
        style={{
          width: isTop ? "24rem" : "12rem",
          marginLeft: "2px",
          marginTop: "1rem",
          fontWeight: "bold"
        }}
      >
        {activity}
      </p>
      <ThumbsUpButton id={id} initialLikes={likes} /> 
    </Card>
  );
}
