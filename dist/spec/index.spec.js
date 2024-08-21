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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
describe('Express App', () => {
    it('should return a list of contacts', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/contacts');
        expect(response.status).toBe(200);
        // Check that the response body has the 'contacts' property
        expect(response.body.contacts).toBeDefined();
        expect(Array.isArray(response.body.contacts)).toBe(true);
        expect(response.body.contacts.length).toBeGreaterThan(0);
    }));
    it('should return 404 for an invalid route', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/invalid-route');
        expect(response.status).toBe(404);
    }));
    it('should upload a file and add a new contact', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/upload')
            .field('id', 'new-id')
            .field('name', 'New Name')
            .field('handle', '@newhandle')
            .attach('avatar', 'spec/fixtures/avatar.jpg'); // Assuming this file exists
        expect(response.status).toBe(302); // Redirect status code
    }));
});
