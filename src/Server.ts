import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import "@tsed/ajv"; // import ajv ts.ed module
import "@tsed/swagger";
import {$log} from "ts-log-debug";

@ServerSettings({
    rootDir: __dirname,
    ajv: {
        errorFormat: (error) => `At ${error.modelName}${error.dataPath}, value '${error.data}' ${error.message}`,
        options: {verbose: true}
    },
    validationModelStrict: true,
    acceptMimes: ["application/json"],
})
export class Server extends ServerLoader {

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    $onMountingMiddlewares(): void | Promise<any> {

        const cookieParser = require("cookie-parser"),
            bodyParser = require("body-parser"),
            compress = require("compression"),
            methodOverride = require("method-override");


        this
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));

        return null;
    }

    $onReady() {
        $log.debug("Server initialized");
    }

    $onServerInitError(error): any {
        $log.error("Server encounter an error =>", error);
    }
}