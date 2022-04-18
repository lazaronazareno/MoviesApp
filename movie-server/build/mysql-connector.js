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
exports.execute = void 0;
const index_1 = require("./index");
/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query
 * @param {string[] | Object} params
 * in the query
 */
const execute = (query, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield new Promise((resolve, reject) => {
            index_1.con.query(query, params, (error, results) => {
                if (error != null)
                    reject(error);
                else
                    resolve(JSON.parse(JSON.stringify(results)));
            });
        });
    }
    catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error(error);
    }
});
exports.execute = execute;
