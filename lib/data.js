// Barrel for server code that wants everything in one import. The data
// itself lives in focused modules so that CLIENT components can import only
// what they use — importing from this file in a "use client" component
// pulls every module below (all the site copy) into the browser bundle.
// Client components: import from the specific module instead.
export * from "./site";
export * from "./packages";
export * from "./services";
export * from "./serviceCatalog";
export * from "./projects";
export * from "./profile";
export * from "./faq";
