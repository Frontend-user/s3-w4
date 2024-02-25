"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityDevicesController = exports.securityRouter = void 0;
const express_1 = require("express");
const tokenValidator_1 = require("../../auth/validation/tokenValidator");
const composition_root_1 = require("../../common/composition-root/composition-root");
const security_controller_1 = require("./security-controller");
exports.securityRouter = (0, express_1.Router)({});
exports.securityDevicesController = composition_root_1.container.resolve(security_controller_1.SecurityDevicesController);
exports.securityRouter.get('/', tokenValidator_1.refreshTokenValidator, tokenValidator_1.tokenValidationMiddleware, exports.securityDevicesController.getDevices.bind(exports.securityDevicesController));
exports.securityRouter.delete('/', tokenValidator_1.refreshTokenValidator, tokenValidator_1.tokenValidationMiddleware, exports.securityDevicesController.deleteDevices.bind(exports.securityDevicesController));
exports.securityRouter.delete('/:deviceId', tokenValidator_1.refreshTokenValidator, tokenValidator_1.tokenValidationMiddleware, exports.securityDevicesController.getDeviceById.bind(exports.securityDevicesController));
//# sourceMappingURL=security-router.js.map