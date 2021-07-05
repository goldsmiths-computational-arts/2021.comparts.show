# 2021.comparts.show

## Getting the code

If you are unfamiliar with git, it is recommended you use the [GitHub Desktop](https://desktop.github.com/) app to clone the repo.

It could also be useful to check out the following tutorials:

- [Shiffman talking about GitHub](https://www.youtube.com/watch?v=BCQHnlnPusY)
- [GitHub guide on using GitHub](https://guides.github.com/activities/hello-world/)

## Current Site

The url for the live site is _tba as of Jul 5 2021_

## [Creating a new site](https://github.com/goldsmiths-computational-arts/goldcomparts.show)

Follow the link to learn how to create your own sub-domain.

## Getting Started

#### Running The Site Locally

Before you start editing the site, a good place to start is getting the site to run locally. To do this you'll need to ensure you have [Node](https://nodejs.org/en/) installed.

In your terminal access the location of the repo on your local device. Type the `cd` command and then drag and drop the folder to save on typing.

Once you're inside the directory within terminal you'll then need to install the node modules (library files) for this project by using `npm install`. Once node has finished installing the required modules you are ready to run the site locally.

```
npm run dev

```

This will load the project into a localhost that you can access from a web browser, it will tell you in the terminal what the URL for this localhost is. Once the site is running locally, any changes that you make to the code (and save) in your IDE of choice will automatically update your local host preview.

#### Choosing Your IDE

Now that you can run the site locally you'll want to edit the site using an IDE. As the site is built using Sapper (we'll get into that later) a lot of the files you'll be editing are in the format .svelte. This means it's a good idea to figure out what IDE you want to use and get set up before trying to do any editing/development.

There are a few options available but if you've not got a strong preference stick to [Visual Studio Code](https://code.visualstudio.com/) as it has an [extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) for working with Sapper or, [Sublime Text](https://www.sublimetext.com/) which is a lightweight code editor which [can be set up](https://svelte.dev/blog/setting-up-your-editor) to read .svelte documents as HTML.

## Editing The Site

The site is using a component framework called [Sapper](https://sapper.svelte.dev/docs). It's a bit like [Gatsby](https://www.gatsbyjs.com/) or [Next](https://nextjs.org/) for [React](https://reactjs.org/), or [Nuxt](https://nuxtjs.org/) for [Vue](https://vuejs.org/).

If that doesn't mean anything to you, it just means it's a way to build a website that is quicker to load and cheaper to run.

To get started the two folders you'll probably care about the most for now are:

##### **static** - Where any media for the site lives.

The **img** folder is for the images & the **css** folder is for the global CSS. Inside the **img** folder, you'll also find **artworks** and **bios** folders where the images for artists and artworks need to end up.

##### **src** - Where the code is kept.

Inside the **src** folder, you'll find a folder called **routes**. This is where the pages of the site are kept. You should notice a file called **index.svelte** - this is the homepage for the site, and will be loaded when a user visits the domain.

The **components** folder is where you'll find elements of a site that can be reused throughout the site.

The **constants** folder contains any type of static content that might be used across multiple pages (i.e. names, titles, etc)

The **sketches** folder contains p5js and three.js sketches (more on this later)

##### Svelte

The content of .svelte files is mostly the same as what you'd expect from an HTML file, the main difference is the use of [Svelte](https://svelte.dev/). This lets you do some things which may look odd - it is **highly recommended** you go through the [tutorials](https://svelte.dev/tutorial/basics).

If you ever find yourself needing to write to Javascript, it's worth seeing if there is a way to do it in Svelte rather than vanilla JS as it will often be easier.

## Deployment

To publish any changes you've made to your local copy of the site you should follow this checklist.

1.  Save any changes to your local files.
2.  Check that your changes work locally using `npm run dev`.
3.  Push your changes to the GitHub repo.
4.  Let the other people know within your team that you are about to deploy to the live site as it will break temporarily.
5.  Use `npm run deploy` to push your local copy of the site to the live public site.
6.  Check it works on the live site (you might have to wait a couple minutes).

This will export the site to `public` and then commit it to the `gh-pages` and push it to GitHub

## Data Collection and Implementation

Todo

## p5js

This site uses the [p5-svelte](https://github.com/tonyketcham/p5-svelte) library to simplify the process of adding p5js sketches.

### Making context-sensitive sketches

The positioning of p5js sketches can be approached in multiple ways.

The following approach allows us to position sketches with a great degree of flexibility, as it creates a canvas which simply inherits the position and dimension of its containing div, which in turn can be positioned using whichever css properties are relevant in its context.

In order to integrate sketches we must work in two locations - on the page in which we want to integrate a sketch, and on a separate file on which we'll do the sketch development. This code separation is ideal for keeping an organized codebase, as it allows p5js sketches to grow in complexity without affecting the complexity of the .svelte file which contains it.

Let's see what needs to be done on each file.

#### Implementation in .svelte file

Since Sapper works with [SSR](https://www.educative.io/edpresso/what-is-server-side-rendering), a lot of things that p5js requires to function don't exist in the entirety of the lifecycle of a single page loading. This means that if we want to use any p5js code, we must make sure that we don't load it until the page has been mounted. To do so, we must use the [onMount](https://svelte.dev/tutorial/onmount) function, and dynamically import the p5-svelte library after the page has been mounted. This is all done in the top `<script>` tags of our .svelte file:

```
<script>
  import { onMount } from 'svelte' // import onMount function from svelte
  let P5 // create variable to hold default component from p5-svelte library

  // all of the code within this onMount event will be executed after our site has been mounted
  onMount(async () => {
    const module = await import('p5-svelte') // dynamically import p5-svelte
    P5 = module.default // assign library to named variable for usage in other parts of page
  })
</script>

```

Once we've loaded the library, we can create a [svelte:component](https://svelte.dev/tutorial/svelte-component) with the dynamically imported component:

```
 <div id="sketch-container" class="fullscreen-sketch">
    <svelte:component this={P5} sketch={FollowMouse} />
  </div>

```

Note how the svelte:component is within a div that has both an id and a class. The div's ID is relevant, as we'll use it from our p5js implementation to find its parent. The class is relevant as it positions our div, and our p5 canvas will inherit its position and dimension from its div.

In summary, a template of what our p5-enhanced .svelte file would look like:

```
<script>
  import { onMount } from 'svelte'
  import { FollowMouse } from 'sketches' // replace this with whatever sketch you're importing
  import 'css/global.css' // fullscreen-sketch class is defined here

  let P5

  onMount(async () => {
    const module = await import('p5-svelte')
    P5 = module.default
  })
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<body>
  <div id="sketch-container" class="fullscreen-sketch">
    <svelte:component this={P5} sketch={FollowMouse} />
  </div>
</body>

<style>

</style>
```

The fullscreen-sketch is defined in the global-css file, but for the sake of clarity is presented here:

```
.fullscreen-sketch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
```

#### p5js file

Sketches on this site use p5js' instance mode. This means that all sketches must follow the following template:

```
const Sketch = (p) => {
  p.setup = () => {
      ...
  }

  p.draw = () => {
      ...
  }
}

```

For more info on instance mode, check out [this wiki](https://github.com/processing/p5.js/wiki/Global-and-instance-mode) on the Processing foundation's website, or [this Shiffman video](https://www.youtube.com/watch?v=Su792jEauZg).

This means that every p5 function that you know and love is accessible through the 'p' namespace that is being taken in as an input in the arrow function shown in the function above. If you want to draw a circle in the middle of the screen, you'd say:

```
p.circle(p.width / 2, p.height / 2, 100)
```

In order to make our sketch fill its containing div, we must use the following code

```
const Sketch = (p) => {
  p.setup = () => {
    const canvasDiv = document.getElementById('sketch-container')  // gets element from rendered html page. in this case, the div is called sketch-container
    const width = canvasDiv.offsetWidth // gets div width
    const height = canvasDiv.offsetHeight // gets div height
    p.createCanvas(width, height) // creates canvas with appropriate dimensions
  }

  p.draw = () => {
      ...
  }
}
```

That completes our p5js integration.

## three.js

Our three.js integration works similarly yet not exactly the same. Like in the case of p5js, our three integration consists of two parts: one part done on the .svelte file, and one done on a separate sketch file. Read the p5js integration documentation before reading this.

### Implementation in .svelte file

Just like in p5js, we need to make sure we're importing things dynamically to accomodate to our SSR.

Unlike in p5js, with three, we need to manually create a canvas and use a variable to reference it. This allows three to know which canvas to look towards for rendering.

Basic code for this setup would look as follows:

```
<script>
  import { onMount } from 'svelte'

  let el // used as reference for our sketch

  onMount(async () => {
    const threeDemo = await import('sketches/three-demo') // imports three-js sketch
    threeDemo.default().createScene(el) // runs createScene function with reference to canvas
  })
</script>
```

The following snippet shows how we bind the canvas to threejs:

```
  <div id="three-container" class="narrow-sketch">
    <canvas bind:this={el} />
  </div>
```

You'll notice this is very familiar to what we did with p5js, but in this case, we simply use a canvas.

A complete template for a .svelte three.js integration would look as follows:

```
<script>
  import { onMount } from 'svelte'

  let el

  onMount(async () => {
    const threeDemo = await import('sketches/three-demo')
    threeDemo.default().createScene(el)
  })
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<body>
  <div id="three-container" class="narrow-sketch">
    <canvas bind:this={el} />
  </div>
</body>

<style>
  .narrow-sketch {
    position: absolute;
    top: 100px;
    left: 100px;
    width: 100px;
    height: 400px;
    z-index: 0;
  }
</style>
```

### three.js file

Our three.js file is going to look quite similar to ordinary three.js code that you might find anyplace else, with the difference that in our case, we must structure it within a function that returns a function that instantiates our sketch. The following code demonstrates what this would look like in the case of a simple spinning rectangle:

```
import * as THREE from 'three'

const ThreeDemo = () => {
  const canvasDiv = document.getElementById('three-container')
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasDiv.offsetWidth / canvasDiv.offsetHeight,
    0.1,
    1000
  )
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  let renderer
  scene.add(cube)
  camera.position.z = 5

  const animate = () => {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }

  const resize = () => {
    renderer.setSize(canvasDiv.offsetWidth, canvasDiv.offsetHeight)
    camera.aspect = canvasDiv.offsetWidth / canvasDiv.offsetHeight
    camera.updateProjectionMatrix()
  }

  const createScene = (el) => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el })
    resize()
    animate()
  }

  return { createScene }
}

export default ThreeDemo
```

The reason we return the createScene function is so that we can input the 'el' variable, which corresponds to the reference that we're passing onto the canvas on which our animation is being rendered on.

## Aliases

This project uses @rollup/plugin-alias to handle import folder aliases. This means that instead of having to type a relative address to a folder, we can simply type an absolute address, regardless of the folder we're in. For example, instead of `import * from '../../components'`, we can simply say `import * from 'components'`.

To do so, we use the plugin the following way:

```
 alias({
        resolve: ['.jsx', '.js', '.svelte'], // optional, by default this will just look for .js files or folders
        entries: [
          {
            find: 'css',
            replacement: path.resolve(__dirname, 'static/css'),
          },
          {
            find: 'sketches',
            replacement: path.resolve(__dirname, 'src/sketches'),
          },
          {
            find: 'constants',
            replacement: path.resolve(__dirname, 'src/constants'),
          },
          {
            find: 'components',
            replacement: path.resolve(__dirname, 'src/components'),
          },
        ],
      }),
```

The entries array contains a list of objects, where the 'find' component describes the name we want to give a folder, and the replacement component describes the project-relative location of the folder.

To add locations to the alias list:

1 - go to `rollup.config.js`.
2 - find a call to the alias plugin
3 - add entry following the pattern shown
4 - there are two calls to the alias plugin - one for the client, and one for the server. Make sure you add to both.
