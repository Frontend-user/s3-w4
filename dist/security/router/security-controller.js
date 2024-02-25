"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityDevicesController = void 0;
const http_statuses_1 = require("../../common/constants/http-statuses");
const security_repository_1 = require("../repositories/security-repository");
const jwt_service_1 = require("../../application/jwt-service");
const query_security_repository_1 = require("../query-repository/query-security-repository");
const inversify_1 = require("inversify");
let SecurityDevicesController = class SecurityDevicesController {
    constructor(securityRepositories, querySecurityRepositories, jwtService) {
        this.securityRepositories = securityRepositories;
        this.querySecurityRepositories = querySecurityRepositories;
        this.jwtService = jwtService;
    }
    getDevices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = yield this.querySecurityRepositories.getAllDevices(req.cookies.refreshToken);
            if (devices.length > 0) {
                res.send(devices);
            }
            else {
                res.sendStatus(401);
            }
        });
    }
    deleteDevices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.securityRepositories.deleteDevices(req.cookies.refreshToken);
            res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
        });
    }
    getDeviceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.deviceId) {
                res.sendStatus(404);
                return;
            }
            let userId = yield this.jwtService.checkRefreshToken(req.cookies.refreshToken);
            let session = yield this.querySecurityRepositories.getDeviceByDeviceId(req.params.deviceId);
            if (session) {
                if (session.userId !== userId) {
                    res.sendStatus(403);
                    return;
                }
            }
            const resp = yield this.securityRepositories.deleteDeviceById(req.params.deviceId);
            if (!resp) {
                res.sendStatus(404);
                return;
            }
            res.sendStatus(204);
        });
    }
};
exports.SecurityDevicesController = SecurityDevicesController;
exports.SecurityDevicesController = SecurityDevicesController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [security_repository_1.SecurityRepositories,
        query_security_repository_1.QuerySecurityRepositories,
        jwt_service_1.JwtService])
], SecurityDevicesController);
//# sourceMappingURL=security-controller.js.map