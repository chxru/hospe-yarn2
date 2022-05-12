import { NextRouter } from "next/router";

/**
 * Navigate user to given path
 *
 * @param router NextRouter
 * @param path
 */
export const NavigateTo = (
  router: NextRouter,
  path: string,
): void => {
  router.push(path.startsWith("/") ? path : `/${path}`).catch(error => console.error(error));
};
