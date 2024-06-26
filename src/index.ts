import app from './app';

const port = process.env.PORT || 8000;

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;