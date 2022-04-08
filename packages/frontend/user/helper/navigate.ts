import { NextRouter } from "next/router";

/**
 * Navigate user to given path
 *
 * @param router NextRouter
 * @param path
 * @param evt DOM Event
 */
export const NavigateTo = (
  router: NextRouter,
  path: string,
  evt?: any
): void => {
  if (evt) evt.preventDefault();
  router.push(path.startsWith("/") ? path : `/${path}`);
};
