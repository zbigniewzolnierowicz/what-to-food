import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { createRequestHandler } from '@remix-run/express';
import { NextFunction, Request, Response } from 'express';

@Controller('/')
export class RemixController {
  private remixHandlerPath = '../../../build';

  // constructor() {}

  @All('*')
  handler(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    if (this.isStaticAsset(request)) return next();
    this.purgeRequireCacheInDev();

    return createRequestHandler({
      // `remix build` and `remix dev` output files to a build directory, you need
      // to pass that build to the request handler
      build: require(this.remixHandlerPath),

      // return anything you want here to be available as `context` in your
      // loaders and actions. This is where you can bridge the gap between Remix
      // and your server
      getLoadContext: () => ({}),
    })(request, response, next);
  }

  private purgeRequireCacheInDev() {
    if (process.env.NODE_ENV === 'production') return;

    for (const key in require.cache) {
      if (key.startsWith(this.remixHandlerPath)) {
        delete require.cache[key];
      }
    }
  }

  private isStaticAsset(request: Request) {
    return /^\/(build|assets)\//gi.test(request.url);
  }
}
