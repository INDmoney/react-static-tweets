# Changes different from the parent fork:

Parent package doesn't give us the way for us to change its default components like [mdx [originaly did in v1] does](https://mdxjs.com/docs/using-mdx/#components). Since stencil has to use a wrapper on top of `next/image` Image component to prefix the image urls, we had to fork the parent package, make necessary changes to be able to pass custom loader to the `next/image` that `react-static-tweets` original package uses inside, at least for the avatar image for the tweet.

There were a lot of issues that I wasn't able to figure out but eventually worked around. Following are the changes that were made to make a build happen in this mono repo which didn't cause a module related issue in stencil (at this point of writing, using Next.js v12).

Some of the issues that I faced while 'intuitively' trying to build as I thought authors of the package would.

1. https://github.com/transitive-bullshit/react-static-tweets/issues/35

Since the default tsc compiler based build step was causing issues like the above, which I couldn't figure out the reason of,

1. I copy pasted the changes made in [this open PR](https://github.com/transitive-bullshit/react-static-tweets/pull/34). This basically automatically and very minimally transpiled the code into .cjs ( common js ) and .js ( es module imports ) versions.
2. removed the `"type": "module"` property in both of the `react-static-tweets-indmoney-web` and `static-tweets-indmoney-web`'s `package.json` files and kept the `main` file in package.json as the `.cjs` files for both packages, because there was [a very weird error](https://github.com/transitive-bullshit/react-static-tweets/issues/23#issuecomment-818619457) coming from `swr` package, if we tried to use the es modules `.js` version of the files. If this error wasn't coming we would have been able to use the es modules version of `.js` files since Next.js v12 supports it. But we had to make do with common js (`.cjs`) files to be the default imports.

I also couldn't figure out why `lerna publish` was publishing the whole repository instead of the individual packages. So until that is figured out. Here's how to build and update the packages if you need to:

1. clone the repo
2. run `yarn`
3. make your changes in any of the packages.
4. run `yarn build` FROM THE ROOT. This will initiate running `build` commands specified in individual packages' `package.json` files. This happens automatically through lerna.
5. Go to each of the packages ( whichever you have updated and you want to publish ) by doing `cd ./packages/<package_name>` and run `npm publish`. Before you do make sure you are logged into `indmoney` npm account through npm cli by running. `npm login`. Credentials are shared in this confluence document.
