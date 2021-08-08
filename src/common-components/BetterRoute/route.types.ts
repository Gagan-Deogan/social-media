export type RouteProps = {
  path?: string;
  element: JSX.Element;
  type: "PROTECTED" | "PUBLIC-ONLY";
};
