"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.NodemailerService = void 0;
const inversify_1 = require("inversify");
const nodemailer = require("nodemailer");
let NodemailerService = class NodemailerService {
    send(confirmationCode, emailToSend) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transporter = yield nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "robersargsyan2023@gmail.com",
                        pass: "vqcubthqzapwnboe",
                    },
                });
                const info = yield transporter.sendMail({
                    from: '"Fred Foo 👻" <robersargsyan2023@gmail.com>',
                    to: emailToSend,
                    subject: "Hello ✔",
                    text: `Hello world?`,
                    html: ` <h1>Thank for your registration</h1>
 <p>To finish registration please follow the link below:
     <a href='https://somesite.com/confirm-email?code=${confirmationCode}'>complete registration</a>
 </p>
`,
                });
                return true;
            }
            catch (err) {
                console.error('Ошибка в отправке писем: ', err.body.responseCode);
                return false;
            }
        });
    }
    sendRecoveryCode(recoveryCode, emailToSend) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transporter = yield nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "robersargsyan2023@gmail.com",
                        pass: "vqcubthqzapwnboe",
                    },
                });
                const info = yield transporter.sendMail({
                    from: '"Fred Foo 👻" <robersargsyan2023@gmail.com>',
                    to: emailToSend,
                    subject: "Hello ✔",
                    text: `Hello world?`,
                    html: `  <h1>Password recovery</h1>
       <p>To finish password recovery please follow the link below:
       ${recoveryCode}
          <a href='https://somesite.com/password-recovery?recoveryCode=${recoveryCode}'>recovery password</a>
      </p>
    
`,
                });
                return true;
            }
            catch (err) {
                console.error('Ошибка в отправке писем: ', err.body.responseCode);
                return false;
            }
        });
    }
};
exports.NodemailerService = NodemailerService;
exports.NodemailerService = NodemailerService = __decorate([
    (0, inversify_1.injectable)()
], NodemailerService);
//# sourceMappingURL=nodemailer-service.js.map