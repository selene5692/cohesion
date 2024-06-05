import { useEffect, useState } from "react";
import { Card, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navigation from "../components/Navigation";
import ThumbsUpButton from "../components/ThumbsUpButton"

export default function PostPageHome() {
  const [posts, setPosts] = useState([]);

  async function getAllPosts() {
    const query = await getDocs(collection(db, "posts"));
    const posts = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setPosts(posts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const ImagesRow = () => {
    return posts.map((post, index) => <ImageSquare key={index} post={post} />);
  };

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
}

function ImageSquare({ post }) {
  const { activity, image, likes, id } = post;
  // const thumbsUpCount = {likes}; // Placeholder count
  const handleThumbsUpPress = () => {
    alert('Please read the details before liking the post!');
  };
  
  return (
    <Card style={{ width: "18rem", margin: "auto" }}> {/* Adjusted Card width and centered */}
      <Link
        to={`post/${id}`}
        style={{
          width: "100%", // Ensure Link fills the Card width
          display: "inline-block", // Make Link behave like a block element for margin
          marginLeft: "2px", // Add left margin
          marginTop: "1rem",
        }}
      >
        <Image
          src={image}
          style={{
            objectFit: "cover",
            width: "100%", // Match Image width to Card width
            height: "18rem",
            borderRadius: "2px", // Optional: Adds rounded corners to the image
          }}
        />
      </Link>
      <p
        style={{
          width: "18rem",
          marginLeft: "2px", // Align with the Image margin
          marginTop: "1rem",
          fontWeight: "bold"
        }}
      >
        {activity}
      </p>
      <ThumbsUpButton count={likes} onPress={() => handleThumbsUpPress()} />
    </Card>
  );
}