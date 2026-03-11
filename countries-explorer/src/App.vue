<template>
  <header class="main-header">
    <h1>Explorateur de Pays</h1>
    <nav>
      <router-link to="/" class="nav-link">Accueil</router-link>
      <router-link to="/visited" class="nav-link">Mes Visites</router-link>
    </nav>
  </header>

  <router-view />
</template>

<style>
body {
  font-family: sans-serif;
  background: #f4f7f6;
  margin: 0;
  padding: 20px;
}

.main-header {
  text-align: center;
  margin-bottom: 30px;
}

nav {
  margin-top: 10px;
}

.nav-link {
  margin: 0 10px;
  text-decoration: none;
  color: #3498db;
  font-weight: bold;
}

.router-link-active {
  color: #2ecc71;
  border-bottom: 2px solid #2ecc71;
}
</style>