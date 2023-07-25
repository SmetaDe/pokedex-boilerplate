// Import the necessary modules
const express = require("express");
const morgan = require("morgan");
const pokeBank = require("./pokeBank");

// Initialize the Express application
const app = express();
app.use(morgan("dev"));

// Define the homepage route
app.get("/", (req, res) => {
  const pokemonList = pokeBank.list();
  let html = "<h1>Pokedex</h1>";
  pokemonList.forEach((pokemon) => {
    html += `<p><a href="/pokemon/${pokemon.id}">${pokemon.name}</a></p>`;
  });
  res.send(html);
});


// Define the Pokemon details route
app.get("/pokemon/:id", (req, res) => {
  const pokemon = pokeBank.find(req.params.id);
  if (!pokemon) {
    res.status(404).send("Pokemon not found");
  } else {
    let html = `<h1>${pokemon.name}</h1>`;
    html += `<p>Type: ${pokemon.type}</p>`;
    html += `<p>Trainer: ${pokemon.trainer}</p>`;
    html += `<p>Date: ${pokemon.date}</p>`;
    res.send(html);
  }
});

// Custom Error Hadling
app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = find(id);
  if (!pokemon.id) {
    throw new Error("Not Found");
  }
});

// Part 6 adding routes
const Pokemon = require("./models/Pokemon");

app.get("/pokemon", async (req, res) => {
  const pokemon = await Pokemon.findAll();
  res.json(pokemon);
});
app.get("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});
app.post("/pokemon", async (req, res) => {
  const newPokemon = await Pokemon.create(req.body);
  res.json(newPokemon);
});
app.put("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.update(req.body);
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});
app.delete("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Pokemon not found");
  }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});