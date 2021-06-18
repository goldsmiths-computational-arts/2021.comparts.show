import { stores } from "@sapper/app";

export function tracking() {
  const { page } = stores();

  let firstView = true;

  page.subscribe(() => {
    if (firstView) {
      return (firstView = false);
    }

    ga("send", "pageview", location.pathname);
  });
}
