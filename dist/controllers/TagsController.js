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
exports.getSingleTag = exports.getTags = void 0;
const helpers_1 = require("../helpers");
const config_1 = __importDefault(require("../config"));
// export const getTags = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const tags = await pool.query('SELECT * FROM tags');
//     return res.status(200).json(tags.rows);
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
exports.getTags = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield config_1.default.query('SELECT * FROM gett_all_tags()');
        return res.status(200).json(tags.rows);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
// export const getSingleTag = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const tag = await pool.query('SELECT * FROM tags WHERE tagname = $1', [req.params.tagname]);
//     if (tag.rows.length === 0) {
//       return res.status(404).json(responseHandler(false, 404, 'Tag not found', null));
//     }
//     return res.status(200).json(tag.rows[0]);
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
exports.getSingleTag = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield config_1.default.query('SELECT * FROM get_tagg_by_id($1)', [req.params.tag_id]);
        if (tag.rows.length === 0) {
            return res.status(404).json((0, helpers_1.responseHandler)(false, 404, 'Tag not found', null));
        }
        return res.status(200).json(tag.rows[0]);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
