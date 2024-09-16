import { FastifyPluginAsync, FastifyServerOptions } from 'fastify'
import cors from '@fastify/cors'
import {AutoloadPluginOptions} from '@fastify/autoload';
import fastifyListRoutes from "./src/plugins/list_routes"
interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions>{}
const options: AppOptions = {
  logger: false,
  autoHooks: true,
}
const appIndex: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  await fastify.register(fastifyListRoutes, {colors: true})
  await fastify.register(cors);
  await fastify.register(require("./src/routes/auth/default"))
  await fastify.register(import('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute'
  })
}
export default appIndex
export {appIndex, options}




























/**
 * 
const fastify = Fastify({
  logger: true
})
async function registerPlugin(){
  await fastify.register(cors)
}
fastify.register(AutoLoad, {
  dir: join(__dirname, 'routes'),
  options: opts
})

fastify.get('/ping', async (request, reply) => {
  return 'pong\n'
})

registerPlugin().then(() => {
  fastify.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
})

 */