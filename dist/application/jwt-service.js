"use strict";
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
exports.JwtService = void 0;
const bcrypt = require('bcrypt');
const mongodb_1 = require("mongodb");
const jwt = require('jsonwebtoken');
class JwtService {
    constructor(usersQueryRepository) {
        this.usersQueryRepository = usersQueryRepository;
    }
    createJWT(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '10m' });
        });
    }
    createRefreshToken(userId, newDeviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jwt.sign({
                userId: userId,
                deviceId: newDeviceId
            }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10h' });
        });
    }
    checkRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
                let isFindUser = yield this.usersQueryRepository.getUserById(new mongodb_1.ObjectId(result.userId));
                return isFindUser ? result.userId : false;
            }
            catch (error) {
                return;
            }
        });
    }
    getRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
                return result ? result : false;
            }
            catch (error) {
                return;
            }
        });
    }
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield jwt.verify(token, process.env.JWT_SECRET);
                let isFindUser = yield this.usersQueryRepository.getUserById(new mongodb_1.ObjectId(result.userId));
                return isFindUser ? result.userId : false;
            }
            catch (error) {
                return;
            }
        });
    }
    generateSalt(saltNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.genSalt(saltNumber);
        });
    }
    generateHash(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt.hash(password, salt);
            if (hash) {
                return hash;
            }
            return false;
        });
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=jwt-service.js.map