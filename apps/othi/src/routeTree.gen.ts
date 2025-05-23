/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as WhoamiIndexImport } from './routes/whoami/index'
import { Route as SudoIndexImport } from './routes/sudo/index'
import { Route as SudoTableBlogtagIndexImport } from './routes/sudo/table/blog_tag/index'
import { Route as SudoTableBlogIndexImport } from './routes/sudo/table/blog/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WhoamiIndexRoute = WhoamiIndexImport.update({
  id: '/whoami/',
  path: '/whoami/',
  getParentRoute: () => rootRoute,
} as any)

const SudoIndexRoute = SudoIndexImport.update({
  id: '/sudo/',
  path: '/sudo/',
  getParentRoute: () => rootRoute,
} as any)

const SudoTableBlogtagIndexRoute = SudoTableBlogtagIndexImport.update({
  id: '/sudo/table/blog_tag/',
  path: '/sudo/table/blog_tag/',
  getParentRoute: () => rootRoute,
} as any)

const SudoTableBlogIndexRoute = SudoTableBlogIndexImport.update({
  id: '/sudo/table/blog/',
  path: '/sudo/table/blog/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/sudo/': {
      id: '/sudo/'
      path: '/sudo'
      fullPath: '/sudo'
      preLoaderRoute: typeof SudoIndexImport
      parentRoute: typeof rootRoute
    }
    '/whoami/': {
      id: '/whoami/'
      path: '/whoami'
      fullPath: '/whoami'
      preLoaderRoute: typeof WhoamiIndexImport
      parentRoute: typeof rootRoute
    }
    '/sudo/table/blog/': {
      id: '/sudo/table/blog/'
      path: '/sudo/table/blog'
      fullPath: '/sudo/table/blog'
      preLoaderRoute: typeof SudoTableBlogIndexImport
      parentRoute: typeof rootRoute
    }
    '/sudo/table/blog_tag/': {
      id: '/sudo/table/blog_tag/'
      path: '/sudo/table/blog_tag'
      fullPath: '/sudo/table/blog_tag'
      preLoaderRoute: typeof SudoTableBlogtagIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/sudo': typeof SudoIndexRoute
  '/whoami': typeof WhoamiIndexRoute
  '/sudo/table/blog': typeof SudoTableBlogIndexRoute
  '/sudo/table/blog_tag': typeof SudoTableBlogtagIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/sudo': typeof SudoIndexRoute
  '/whoami': typeof WhoamiIndexRoute
  '/sudo/table/blog': typeof SudoTableBlogIndexRoute
  '/sudo/table/blog_tag': typeof SudoTableBlogtagIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/sudo/': typeof SudoIndexRoute
  '/whoami/': typeof WhoamiIndexRoute
  '/sudo/table/blog/': typeof SudoTableBlogIndexRoute
  '/sudo/table/blog_tag/': typeof SudoTableBlogtagIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/sudo'
    | '/whoami'
    | '/sudo/table/blog'
    | '/sudo/table/blog_tag'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/sudo' | '/whoami' | '/sudo/table/blog' | '/sudo/table/blog_tag'
  id:
    | '__root__'
    | '/'
    | '/sudo/'
    | '/whoami/'
    | '/sudo/table/blog/'
    | '/sudo/table/blog_tag/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SudoIndexRoute: typeof SudoIndexRoute
  WhoamiIndexRoute: typeof WhoamiIndexRoute
  SudoTableBlogIndexRoute: typeof SudoTableBlogIndexRoute
  SudoTableBlogtagIndexRoute: typeof SudoTableBlogtagIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SudoIndexRoute: SudoIndexRoute,
  WhoamiIndexRoute: WhoamiIndexRoute,
  SudoTableBlogIndexRoute: SudoTableBlogIndexRoute,
  SudoTableBlogtagIndexRoute: SudoTableBlogtagIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/sudo/",
        "/whoami/",
        "/sudo/table/blog/",
        "/sudo/table/blog_tag/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/sudo/": {
      "filePath": "sudo/index.tsx"
    },
    "/whoami/": {
      "filePath": "whoami/index.tsx"
    },
    "/sudo/table/blog/": {
      "filePath": "sudo/table/blog/index.tsx"
    },
    "/sudo/table/blog_tag/": {
      "filePath": "sudo/table/blog_tag/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
