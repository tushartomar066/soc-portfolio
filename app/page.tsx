import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Blog } from "@/components/sections/Blog";
import { GitHubRepos } from "@/components/sections/GitHubRepos";
import { Contact } from "@/components/sections/Contact";
import { getAllPosts } from "@/lib/mdx";
import { getGitHubRepos } from "@/lib/github";

// Home is a Server Component: blog metadata + GitHub repos are fetched
// on the server and passed down to the (client) section components.
export default async function Home() {
  const posts = getAllPosts().slice(0, 3);
  const repos = await getGitHubRepos(6);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Experience />
        <Projects />
        <Blog posts={posts} />
        <GitHubRepos repos={repos} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
