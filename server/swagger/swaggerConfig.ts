import swaggerJSDoc from "swagger-jsdoc";
// import { resolve } from "path";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        info: {
            title: "Silpasathi-Ease-of-Doing-Business",
            description: "API Documentation Of Silpasathi",
            version: "1.0.0",
        },
        host: "localhost:4000/api/v1",
    },
    // servers: [
    //     {
    //         url: "localhost:{port}/{basePath}",
    //         description: "The production API server",
    //         variables: {
    //             username: {
    //                 default: "demo",
    //                 description: "this value is assigned by the service provider, in this example `gigantic-server.com`",
    //             },
    //             port: {
    //                 default: "4000",
    //             },
    //             basePath: {
    //                 default: "api/v1",
    //             },
    //         },
    //     },
    // ],

    // apis: [resolve(__dirname, "./controllers/index.ts")],
    apis: ["./controllers/auth/index.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
