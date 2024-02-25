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
exports.QuerySecurityRepositories = void 0;
const change_id_format_1 = require("../../common/custom-methods/change-id-format");
const db_1 = require("../../db");
const jwt_service_1 = require("../../application/jwt-service");
const inversify_1 = require("inversify");
let QuerySecurityRepositories = class QuerySecurityRepositories {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    getAllDevices(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield this.jwtService.getRefreshToken(refreshToken);
            const response = yield db_1.DeviceModel.find({ userId: tokenData.userId }).lean();
            const devices = response.map((i => (0, change_id_format_1.deleteMongoUserId)(i)));
            return devices ? devices : [];
        });
    }
    getDeviceByDeviceId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.DeviceModel.findOne({ deviceId: deviceId }).lean();
            return response ? response : false;
        });
    }
    getDeviceByDateAndDeviceId(oldTokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            let device = yield db_1.DeviceModel.findOne({ $and: [{ deviceId: oldTokenData.deviceId }, { lastActiveDate: new Date(oldTokenData.iat).toISOString() }] }).lean();
            return device;
        });
    }
};
exports.QuerySecurityRepositories = QuerySecurityRepositories;
exports.QuerySecurityRepositories = QuerySecurityRepositories = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], QuerySecurityRepositories);
//# sourceMappingURL=query-security-repository.js.map