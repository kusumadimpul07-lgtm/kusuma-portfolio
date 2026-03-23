/* ============================================
   KUSUMA MOTHKU — PORTFOLIO JAVASCRIPT
   script.js
   ============================================ */

/* ---- HAMBURGER MENU ---- */
function toggleMenu() {
  const nav  = document.getElementById('nav-links');
  const btn  = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* ---- CUSTOM CURSOR ---- */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

function animRing() {
  rx += (parseFloat(cursor.style.left || 0) - rx) * 0.12;
  ry += (parseFloat(cursor.style.top  || 0) - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

/* Scale cursor on interactive elements */
const interactiveEls = 'a, button, .project-card, .about-card, .skill-cat, .contact-link, .blog-card, .modal-close';
document.querySelectorAll(interactiveEls).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width   = '20px';
    cursor.style.height  = '20px';
    cursor.style.opacity = '0.5';
    ring.style.width     = '56px';
    ring.style.height    = '56px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width   = '12px';
    cursor.style.height  = '12px';
    cursor.style.opacity = '1';
    ring.style.width     = '36px';
    ring.style.height    = '36px';
  });
});

/* ---- SCROLL REVEAL ---- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => revealObserver.observe(el));

/* ---- ACTIVE NAV HIGHLIGHT ---- */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
  });
  document.querySelectorAll('nav ul a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

/* ---- SMOOTH SCROLL BUTTONS ---- */
function scrollToProjects() {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

/* ---- CONTACT FORM → WHATSAPP ---- */
function handleFormSubmit(btn) {
  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  /* Basic validation */
  if (!name || !email || !message) {
    showFormError('Please fill in all fields before sending.');
    return;
  }
  if (!email.includes('@')) {
    showFormError('Please enter a valid email address.');
    return;
  }

  /* Build WhatsApp message */
  const phone = '919603605680'; // Kusuma's number — country code + number, no +
  const text  = `Hi Kusuma! 👋\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;
  const url   = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  /* Open WhatsApp */
  window.open(url, '_blank');

  /* Success feedback */
  btn.textContent = 'Opening WhatsApp ✓';
  btn.style.background = '#25d366'; /* WhatsApp green */

  /* Reset form after 3 seconds */
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    document.getElementById('contact-name').value    = '';
    document.getElementById('contact-email').value   = '';
    document.getElementById('contact-message').value = '';
    clearFormError();
  }, 3000);
}

function showFormError(msg) {
  let err = document.getElementById('form-error');
  if (!err) {
    err = document.createElement('p');
    err.id = 'form-error';
    err.style.cssText = 'color:#ff6b6b;font-size:13px;margin-bottom:12px;margin-top:-8px;';
    const btn = document.querySelector('.form-submit');
    btn.parentNode.insertBefore(err, btn);
  }
  err.textContent = msg;
}
function clearFormError() {
  const err = document.getElementById('form-error');
  if (err) err.textContent = '';
}

/* ============================================
   BLOG ARTICLE DATA
   ============================================ */
const articles = {
  a1: `
    <div class="m-tag"><span>React</span><small>· March 2025 · 6 min read</small></div>
    <h2>How I Built a Full MERN App from Scratch — and What I Learned</h2>
    <p class="m-byline">By <strong>Kusuma Mothku</strong> · React Developer, Hyderabad</p>
    <p>When I decided to build a complete MERN stack application on my own, I thought I had a pretty solid plan. I had the tech, I had the idea, I had the weekend. What I didn't have was any idea how many small decisions add up when you're building something real.</p>
    <p>Here's an honest account of what that journey looked like — the rough parts, the breakthroughs, and the things I'd do differently.</p>
    <h3>Starting with the backend (and why I recommend it)</h3>
    <p>Most React developers naturally want to start with what they can see — the UI. I resisted that urge and started with the Express + MongoDB layer first. This turned out to be the right call. Once the API routes were working and I could test them in Postman, plugging the frontend in was much smoother.</p>
    <div class="m-highlight">"Build what you can't see first. If the data flows correctly, the UI almost writes itself."</div>
    <p>Setting up MongoDB Atlas for the first time felt complicated — but it's genuinely just four steps: create a cluster, whitelist your IP, create a user, and grab your connection string. I overthought it for two hours before realizing it was that simple.</p>
    <h3>The React component problem I kept hitting</h3>
    <p>I made a classic early mistake: building components that were too large and knew too much about the application state. A single <code>Dashboard.jsx</code> file became 400 lines long and started managing its own API calls, its own loading states, and its own error handling.</p>
    <p>The fix was separating concerns — breaking things into a container component that handles data fetching, and a presentation component that just renders. Once I did that, testing became 10x easier and reuse became possible.</p>
    <h3>JWT authentication — where I got stuck for two days</h3>
    <p>Authentication is where most MERN tutorials gloss over the hard parts. I implemented JWT correctly on the backend, but kept getting 401 errors on protected routes. The issue? I was storing the token correctly but forgetting to attach it as a Bearer token in my Axios request headers.</p>
    <ul>
      <li>Store the token in <code>localStorage</code> on login</li>
      <li>Create an Axios instance with a request interceptor that attaches <code>Authorization: Bearer &lt;token&gt;</code></li>
      <li>On the backend, use <code>req.headers.authorization.split(' ')[1]</code> to extract it</li>
    </ul>
    <p>Once I set up a global Axios interceptor, the problem disappeared entirely and I never had to think about it again.</p>
    <h3>Deployment — the part nobody tells you about</h3>
    <p>Deploying a full MERN app is not the same as deploying a simple HTML file. The frontend on Netlify was easy. The backend on Render required setting environment variables, handling CORS properly for the production domain, and making sure my MongoDB connection string was in the environment and not hardcoded (a mistake I definitely didn't make... twice).</p>
    <p>The biggest lesson from this whole project? Just build it. You'll figure out 90% of the problems by running into them. Documentation is your friend, Stack Overflow is your backup, and shipping something imperfect is infinitely better than planning something perfect.</p>
  `,
  a2: `
    <div class="m-tag"><span>JavaScript</span><small>· January 2025 · 5 min read</small></div>
    <h2>React Components the Right Way: Reusability Patterns I Use Daily</h2>
    <p class="m-byline">By <strong>Kusuma Mothku</strong> · React Developer, Hyderabad</p>
    <p>When I started working with React professionally, I wrote components the way most beginners do — one big component that does everything. It works, until it doesn't. The moment you need to reuse a piece of UI in a different context, or when a designer asks to change a button style across 40 pages, you feel it.</p>
    <p>Over time, I've settled into a few patterns that genuinely make my components more reusable, more readable, and easier to maintain.</p>
    <h3>1. Separate your container and presentational components</h3>
    <p>This is the most fundamental pattern. A container component handles logic — API calls, state management, side effects. A presentational component just receives props and renders UI. It has no idea where the data comes from.</p>
    <div class="m-highlight">If a component is making API calls AND rendering JSX, it's doing too much. Split it.</div>
    <p>The benefit is immediate: your presentational components become instantly reusable. You can feed them data from a hook, from a Redux store, from a hardcoded array — it doesn't matter. They just render.</p>
    <h3>2. Use composition over configuration</h3>
    <p>It's tempting to add props like <code>showHeader</code>, <code>showFooter</code>, <code>variant="large"</code> to a single component. But this leads to components with 15 optional props that are impossible to reason about.</p>
    <p>Instead, compose smaller pieces. Build a <code>&lt;Card /&gt;</code>, a <code>&lt;CardHeader /&gt;</code>, and a <code>&lt;CardBody /&gt;</code> separately, then compose them where you need them. This is exactly how Shadcn UI, Radix, and most modern libraries are built.</p>
    <h3>3. Custom hooks are your best friends</h3>
    <p>Any time I find myself writing the same <code>useState</code> + <code>useEffect</code> pattern in more than one place, I extract it into a custom hook. A <code>useFetch</code> hook that handles loading, error, and data states — written once, used everywhere. A <code>useDebounce</code> hook for search inputs. A <code>useLocalStorage</code> hook. These become your personal utility library.</p>
    <h3>4. Default props and prop validation</h3>
    <p>Before TypeScript, I relied on PropTypes. Now I use TypeScript interfaces. Either way, defining what a component expects — and what the defaults are — saves hours of debugging mystery bugs caused by undefined props. It also makes your components self-documenting.</p>
    <p>These aren't revolutionary ideas. They're just discipline. But applied consistently, they're what separate a codebase that's a joy to work in from one that everyone dreads touching.</p>
  `,
  a3: `
    <div class="m-tag"><span>Career</span><small>· November 2024 · 7 min read</small></div>
    <h2>From MBA to Developer: My Unconventional Path into Tech</h2>
    <p class="m-byline">By <strong>Kusuma Mothku</strong> · React Developer, Hyderabad</p>
    <p>When people find out I have an MBA in Systems before becoming a software developer, the reaction is usually one of two things: confusion, or "oh, that actually makes sense." I've come to believe the second reaction is the right one — though it took me a while to see it that way myself.</p>
    <p>Here's the honest story of how I ended up writing React components for a living, and what studying Systems Management actually gave me that a CS degree might not have.</p>
    <h3>Why Systems, not Computer Science?</h3>
    <p>When I enrolled in my MBA program, I was drawn to the intersection of technology and business. I wanted to understand how systems — organizational, software, operational — fit together. The curriculum covered database design, systems analysis, ERP platforms, project management, and business process modeling. It was technical, but from a 10,000-foot view.</p>
    <div class="m-highlight">"Studying systems taught me to ask 'why does this exist' before asking 'how do I build it.' That question has saved me from building the wrong thing more than once."</div>
    <p>What it didn't give me was the ability to actually build software. For that, I had to teach myself.</p>
    <h3>The self-learning phase</h3>
    <p>I started with HTML and CSS — everyone does. Then JavaScript, which genuinely broke my brain for about three weeks before things clicked. React came next, and somehow it felt natural. The component model, the data flow, the way UI becomes a function of state — it mapped well onto the systems thinking I already had.</p>
    <p>I built small projects. Then slightly less small projects. Then I landed my first role at TutorialsPoint, working on their frontend. The learning curve was real, but the foundations held.</p>
    <h3>What the MBA actually gave me</h3>
    <p>The unexpected advantages showed up quickly once I was working professionally:</p>
    <ul>
      <li>I could talk to stakeholders and translate business requirements into technical decisions without a product manager in between</li>
      <li>I naturally thought about data modeling and system design before writing code</li>
      <li>I understood why the software existed — what problem it solved — which made my implementation decisions better</li>
      <li>Project management concepts like scope, timelines, and priorities weren't abstract — I'd studied them formally</li>
    </ul>
    <h3>The road from there to here</h3>
    <p>After TutorialsPoint, I joined Cust Q Software Services as a Software Developer, building full MERN stack applications. I also started my own small startup and built a complete company portal for it — something I couldn't have conceived of doing just two years earlier.</p>
    <p>If you're considering a similar path — an unconventional background moving into tech — my honest advice is this: your non-technical background is not a gap. It's a perspective. Use it. The industry has plenty of people who can code. It has far fewer who can code and also understand why the code matters.</p>
  `
};

/* ---- BLOG MODAL ---- */
function openArticle(id) {
  document.getElementById('modal-content').innerHTML = articles[id];
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeArticle() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeArticle();
});
