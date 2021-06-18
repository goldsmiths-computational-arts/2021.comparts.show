<script>
  import { stores } from "@sapper/app";
  const { page } = stores();
  // $: console.log("PAGE PATH = " + $page.path);

  let showArrow = true;
  $: if($page.path == "/"){
    showArrow = false;
  }else{
    showArrow = true;
  }

  let showMenu = false;

  let menuItems = [
    { label: "Artists", href: "/artists" },
    { label: "Artworks", href: "/artworks" },
    //{ label: "Schedule", href: "/schedule" },
    { label: "Live", href: "/live" },
    //{ label: "About", href: "/about" },
  ];

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function hideMenu() {
    showMenu = false;
  }
</script>

<nav
  class="navbar is-transparent"
  role="navigation"
  aria-label="main navigation"
>
  <div class="container">
    <div class="navbar-brand">
      {#if showArrow}
      <a class="navbar-item" href="/" id="backArrow">
        <img
          src="/img/brand.svg"
          opacity="0"
          width="250"
          height="45"
          alt="Back Arrow"
        />
      </a>
      {/if}
      <a
        href="#top"
        on:click={toggleMenu}
        role="button"
        class="navbar-burger burger"
        class:is-active={showMenu}
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" class:is-active={showMenu}>
      <div class="navbar-end">
        {#each menuItems as item}
          <a
            class="navbar-item"
            class:is-active={$page.path === item.href}
            href={item.href}
            on:click={hideMenu}
          >
            {item.label}
          </a>
        {/each}
      </div>
    </div>
  </div>
</nav>

<style>
  nav {
    background-color: black;
  }

  a {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    color: #fcfcfc;
    border-bottom: 4px solid transparent;
  }

  a.is-active {
    border-bottom-color: #ffffa1;
    color: #ffffa1;
    background-color: transparent;
  }

  a:hover{
    border-bottom-color: #fffff0;
    color: #fffff0;
    background-color: transparent;
  }

  @media only screen and (max-width: 1023px) {
    .navbar-menu {
      background-color: transparent;
    }
  }

  @media only screen and (min-width: 768px) {
    nav {
      padding-top: 20px;
    }
    .navbar-item img {
      margin-top: -10px;
      max-height: 2.3rem;
    }
  }

  @media only screen and (max-width: 768px) {
    .navbar-item img {
      margin-left: -10px;
    }
    #backArrow{
      width:30%;
    }
  }
</style>
