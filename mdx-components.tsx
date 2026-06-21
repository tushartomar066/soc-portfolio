import type { MDXComponents } from "mdx/types";

/**
 * Required by Next.js when using MDX. Lets us override how MDX elements
 * render. We keep defaults here since prose styling is applied via the
 * wrapping container in the post page.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
