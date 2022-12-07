import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
// import Card from "./components/Card";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";

function App() {
  const pageNumber = useParams().pageNumber || 1;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://mern-pagination-server.onrender.com/get?page=${page}`
        );
        const { pages: totalPages, data } = await res.json();
        setPages(totalPages);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="app">
      <Pagination
        defaultPage={1}
        count={pages}
        page={page}
        color="primary"
        style={{ margin: "20px 0" }}
        onChange={(e, value) => setPage(value)}
      />
      <div className="app__posts">
        {posts.map((post) => (
          <Card
            style={{
              height: "320px",
              margin: "10px",
              borderRadius: "20px",
              overflow: "auto",
            }}
            key={post._id}
            variant="outlined"
          >
            <React.Fragment>
              <CardContent>
                <Typography
                  style={{ maxWidth: "fit-content" }}
                  variant="h5"
                  component="div"
                >
                  {post.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {post.author}
                </Typography>
                <Typography variant="body2" style={{ width: "200px" }}>
                  {post.body}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  <a
                    href="https://youtube.com/@tahawy.111"
                    style={{ textDecoration: "none", color: "inherit" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    My Youtube Channel
                  </a>
                </Button>
              </CardActions>
            </React.Fragment>
          </Card>
        ))}
      </div>
      <Pagination
        defaultPage={1}
        count={pages}
        page={page}
        color="primary"
        style={{ margin: "20px 0" }}
        onChange={(e, value) => setPage(value)}
      />

      <footer className="footer">
        <h3>Welcome to my Channel "عامر الطحاوي"</h3>
        <a
          href="https://youtube.com/@tahawy.111"
          target="_blank"
          style={{ color: "#198bde", fontSize: "20px" }}
          rel="noopener noreferrer"
        >
          https://youtube.com/@tahawy.111
        </a>
        <p>Copyright &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
