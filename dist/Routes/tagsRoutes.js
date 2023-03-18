"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TagsController_1 = require("../controllers/TagsController");
const tagsrouter = (0, express_1.Router)();
tagsrouter.get('/tags', TagsController_1.getTags);
tagsrouter.get('/tags/:tagname', TagsController_1.getSingleTag);
exports.default = tagsrouter;
