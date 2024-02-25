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
exports.SecurityRepositories = void 0;
const db_1 = require("../../db");
const jwt_service_1 = require("../../application/jwt-service");
const inversify_1 = require("inversify");
let SecurityRepositories = class SecurityRepositories {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    createDevice(device) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.DeviceModel.create(device);
            return response ? response._id : false;
        });
    }
    deleteDevices(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield this.jwtService.getRefreshToken(refreshToken);
            let deviceId = token.deviceId;
            let userId = token.userId;
            const response = yield db_1.DeviceModel.deleteMany({ $and: [{ deviceId: { $ne: deviceId } }, { userId: userId }] });
            return !!response.deletedCount;
        });
    }
    updateDevice(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield this.jwtService.getRefreshToken(refreshToken);
            console.log(token, 'token');
            let deviceId = token.deviceId;
            const response = yield db_1.DeviceModel.updateOne({ deviceId: deviceId }, { 'lastActiveDate': new Date(token.iat).toISOString() });
            return !!response;
        });
    }
    deleteDeviceById(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.DeviceModel.deleteOne({ deviceId: deviceId });
            return !!response.deletedCount;
        });
    }
};
exports.SecurityRepositories = SecurityRepositories;
exports.SecurityRepositories = SecurityRepositories = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], SecurityRepositories);
//# sourceMappingURL=security-repository.js.map