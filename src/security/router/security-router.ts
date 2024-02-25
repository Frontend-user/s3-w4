import {Router} from "express";
import {refreshTokenValidator, tokenValidationMiddleware} from "../../auth/validation/tokenValidator";
import {container} from "../../common/composition-root/composition-root";
import {SecurityDevicesController} from "./security-controller";

export const securityRouter = Router({})
export const securityDevicesController = container.resolve(SecurityDevicesController)


securityRouter.get('/',
    refreshTokenValidator,
    tokenValidationMiddleware,
    securityDevicesController.getDevices.bind(securityDevicesController)
    )


securityRouter.delete('/',
    refreshTokenValidator,
    tokenValidationMiddleware,
    securityDevicesController.deleteDevices.bind(securityDevicesController)
)


securityRouter.delete('/:deviceId',
    refreshTokenValidator,
    tokenValidationMiddleware,
    securityDevicesController.getDeviceById.bind(securityDevicesController)
)