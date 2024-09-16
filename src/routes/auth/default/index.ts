import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { RegisterBodyRequest } from "../../../types/auth";

const authCredential = {
    username: "royaljacquess",
    password: "admin"
}

const error = false;
async function BasicAuth(fastify: FastifyInstance, opts:FastifyPluginOptions): Promise<void>  {
    fastify.get("/register", async function (request: FastifyRequest, reply: FastifyReply) {
        if(error){
            reply.status(400).send({
                error: 401,
                message: "username as already taken"
            })
        }else{
            reply.status(200).send({
                status: 200,
                message: "go to your mail for validate your auth"
            })
        }
    })
    fastify.post("/login", async function (request: FastifyRequest, reply: FastifyReply) {
        reply.send({
            "message": "salut"
        })
    })
}
module.exports = BasicAuth
