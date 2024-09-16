import { HTTPMethods, RouteOptions } from "fastify";
import {fastifyPlugin} from "fastify-plugin";


const COLORS = {
    yellow: 33,
    green: 32,
    blue: 34,
    red: 31,
    grey: 90,
    magenta: 35,
    clear: 39,
  };
  enum  ColorsTypes {
    yellow,
    green,
    blue,
    red,
    grey,
    magenta,
    clear,
  };
  type optParam = {
    colors: boolean
  }
  
  const colorText = (color: ColorsTypes, string: string) =>
    `\u001b[${color}m${string}\u001b[${COLORS.clear}m`;
  
  function colorMethod(method: HTTPMethods | HTTPMethods[]) {
    switch (method) {
      case "POST":
        return colorText(COLORS.yellow, method);
      case "GET":
        return colorText(COLORS.green, method);
      case "PUT":
        return colorText(COLORS.blue, method);
      case "DELETE":
        return colorText(COLORS.red, method);
      case "PATCH":
        return colorText(COLORS.grey, method);
      default:
        return method;
    }
  }
  
  function printRoutes(routeOptions: RouteOptions[], opts: any) {
    const { colors } = opts;
  
    if (routeOptions.length === 0) {
      return;
    }
  
    //Sort route Options
    routeOptions.sort((a, b) => a.url.localeCompare(b.url));
  
    console.info("Available routes:");
    for (const routeOption of routeOptions) {
      const { method, url } = routeOption;
      if (method === "HEAD") continue;
      console.info(`${colors ? colorMethod(method) : method}\t${url}`);
    }
  }


export default fastifyPlugin((instance, opts: optParam, next) => {
    const routeOptions: RouteOptions[] = [];

    instance.addHook("onRoute", (routeOption) => {
      routeOptions.push(routeOption);
    });
  
    instance.addHook("onReady", (done) => {
      printRoutes(routeOptions, opts);
      done();
    });
    next();
}, {
    name: "fastify-routes-printer"
})